# Syntrix Persistence Architecture

## Purpose

The persistence layer stores the operational truth for every organization using Syntrix.

Repositories own persistence.

Business engines never know where data is stored.

Workspace services never communicate directly with the database.

Pages and components remain unaware of persistence.

---

## Architectural Goal

Version 0.7 replaces generated data with persistent data without changing the layers above repositories.

Current architecture:

```text
Generated Data
      ↓
Repositories
      ↓
Workspace Services
      ↓
Pages and Components
```

Target architecture:

```text
PostgreSQL
      ↓
Repositories
      ↓
Workspace Services
      ↓
Pages and Components
```

The repository contract remains stable while its underlying data source changes.

---

## Persistence Stack

Syntrix v0.7 uses:

| Capability          | Technology |
| ------------------- | ---------- |
| Relational database | PostgreSQL |
| Database hosting    | Neon       |
| ORM and migrations  | Prisma     |
| Authentication      | Clerk      |
| Application hosting | Vercel     |

Future infrastructure may include:

| Capability          | Candidate        |
| ------------------- | ---------------- |
| Background jobs     | Inngest          |
| File storage        | Cloudflare R2    |
| Event streaming     | To be determined |
| Analytics warehouse | To be determined |

These future systems must integrate without bypassing repositories or violating tenant boundaries.

---

## Layer Ownership

```text
Pages
    ↓
Workspace Services
    ↓
Repositories
    ↓
Prisma
    ↓
PostgreSQL
```

### Pages

Pages assemble workspaces and components.

Pages must not:

* import Prisma
* query the database
* import database models
* implement persistence logic

### Components

Components consume business objects.

Components must not:

* retrieve data
* modify persistence
* know whether data came from mock data or a database

### Workspace Services

Workspace services orchestrate repositories, computed services, business engines, and Intelligence.

Workspace services may request data through repositories.

They must not:

* import Prisma
* execute database queries
* return ORM-specific objects
* contain database transaction logic

### Repositories

Repositories own persistent data access.

They are responsible for:

* tenant filtering
* database queries
* database writes
* mapping persistence records into business objects
* persistence-related transactions
* hiding ORM implementation details

### Business Engines

Engines calculate reusable business objects.

They must remain:

* stateless where practical
* independent of Prisma
* independent of PostgreSQL
* independent of authentication
* reusable with either persisted or generated data

---

## Multi-Tenant Ownership

Every persistent business record belongs to exactly one organization.

```text
Organization
    ├── Memberships
    ├── Users
    ├── Regions
    ├── Districts
    ├── Locations
    ├── Signals
    ├── Priorities
    ├── Assessments
    ├── Recommendations
    ├── Execution Items
    ├── Timeline Events
    ├── Operational Memory
    ├── Reports
    └── Audit Events
```

Every tenant-owned repository operation requires:

```text
organizationId
```

A repository must never retrieve a tenant-owned record by record ID alone.

Valid:

```js
getLocation({
  organizationId,
  locationId,
});
```

Invalid:

```js
getLocation(locationId);
```

Tenant ownership must be included in the database query rather than checked only after retrieval.

---

## Identity, Membership, and Scope

Authentication answers:

> Who is the user?

Organization membership answers:

> Which organization does the user belong to?

Authorization answers:

> What may the user access and change?

Scope answers:

> Which part of the organization may the user operate within?

The authorization flow is:

```text
Authenticated Identity
        ↓
Organization Membership
        ↓
Role and Permissions
        ↓
Hierarchy Scope
        ↓
Workspace Authorization
        ↓
Repository Tenant Enforcement
```

Repositories enforce organization ownership.

Workspace services enforce hierarchy scope and workspace authorization.

Authentication providers must not become the authoritative owner of Syntrix business permissions.

---

## Authentication Boundary

Clerk owns:

* authentication credentials
* sessions
* identity verification
* external user identity
* invitation delivery where applicable

Syntrix owns:

* organizations
* memberships
* business roles
* hierarchy scope
* permissions
* account status
* operational ownership

A Clerk user ID identifies an external identity. It does not replace the Syntrix user or membership record.

---

## Initial Persistent Domain Model

### Organization

Represents one customer tenant.

Owns all operational data.

Core fields:

```text
id
name
slug
status
createdAt
updatedAt
```

### User

Represents a person known to Syntrix.

Core fields:

```text
id
clerkUserId
email
firstName
lastName
status
createdAt
updatedAt
```

A user may eventually belong to more than one organization.

### Organization Membership

Connects a user to an organization.

Core fields:

```text
id
organizationId
userId
role
scopeLevel
scopeEntityId
status
createdAt
updatedAt
```

Membership, rather than the global user record, owns organization-specific authorization.

### Region

Belongs to an organization.

May contain districts.

### District

Belongs to an organization and region.

May contain locations.

### Location

Belongs to an organization and district.

Acts as the primary operational unit for many Syntrix records.

### Signal

Represents a detected operational condition.

Belongs to an organization and usually a location.

### Priority

Represents a ranked operational issue requiring attention.

Belongs to an organization and location.

May originate from one or more signals.

### Assessment

Represents Syntrix’s structured evaluation of a priority.

Belongs to an organization and priority.

### Recommendation

Represents the proposed response to an assessment or priority.

Belongs to an organization and priority.

### Execution Item

Represents an approved or active operational action.

Belongs to an organization, location, and recommendation or priority.

### Timeline Event

Represents meaningful operational activity.

Belongs to an organization and may reference a location, priority, assessment, recommendation, or execution item.

### Operational Memory

Represents retained business context used to improve future decisions.

Belongs to an organization and usually a location.

### Audit Event

Records important user and system changes.

Belongs to an organization.

Audit events are append-only.

---

## Business Objects and Persistence Records

Repositories expose business objects, not Prisma models.

Database records may include:

* foreign keys
* persistence metadata
* normalized relationships
* storage-specific naming
* implementation fields

The repository maps those records into application-facing business objects.

The rest of Syntrix should not depend on Prisma-generated types as its primary domain model.

---

## Repository Contract

Repository functions should use named parameters.

Example:

```js
getLocations({
  organizationId,
  districtId,
});
```

Write operations should also require tenant ownership:

```js
createLocation({
  organizationId,
  input,
});

updateLocation({
  organizationId,
  locationId,
  input,
});
```

Repository functions must:

* validate required ownership identifiers
* include organization ownership in every tenant query
* return `null` or an empty collection when no authorized record exists
* avoid leaking records from another organization
* return predictable business objects
* hide Prisma-specific behavior

---

## Transactions

Transactions belong inside repositories or persistence-specific domain operations.

Workspace services may request a business operation, but they should not coordinate raw Prisma transactions.

Example:

```js
approveRecommendation({
  organizationId,
  recommendationId,
  approvedByUserId,
});
```

The persistence implementation may atomically:

1. update the recommendation
2. create an execution item
3. add a timeline event
4. add an audit event

The caller should not need to know how that transaction is performed.

---

## Audit History

Important business mutations must create audit events.

Examples include:

* organization settings changed
* membership created or disabled
* role changed
* scope changed
* priority status changed
* recommendation approved or rejected
* execution item started or completed

Audit events should contain:

```text
organizationId
actorUserId
action
entityType
entityId
metadata
createdAt
```

Audit events are not normal editable business records.

---

## Migration Strategy

Generated data will be replaced incrementally.

For each domain:

1. Define the Prisma model.
2. Create the migration.
3. Add seed data.
4. Update the repository implementation.
5. Preserve the repository contract.
6. Verify all dependent workspaces.
7. Remove the replaced generated-data dependency.
8. Run the release audit.

Migration order:

```text
Organizations
    ↓
Users and Memberships
    ↓
Regions, Districts, and Locations
    ↓
Signals
    ↓
Priorities
    ↓
Assessments
    ↓
Recommendations
    ↓
Execution Items
    ↓
Timeline Events
    ↓
Operational Memory
    ↓
Audit Events
```

Pages and components should not require migration-specific changes.

---

## Transitional Data Rule

During v0.7, generated and persisted data may coexist temporarily.

Each repository must have only one authoritative implementation at a time.

A repository must not silently merge database records and generated records unless an explicit migration adapter has been designed and documented.

Temporary adapters must be:

* clearly named
* isolated inside the persistence or repository boundary
* documented
* removed before the v0.7 release audit

---

## Failure Handling

Repositories should distinguish between:

* missing records
* invalid input
* authorization failure
* infrastructure failure

Cross-tenant queries should behave like missing records rather than confirming that another tenant’s record exists.

Operational errors must not expose:

* SQL
* connection strings
* internal database identifiers
* Prisma internals
* another tenant’s existence

---

## Performance Principles

Correct ownership and data integrity come before optimization.

Performance improvements may include:

* indexes
* pagination
* selective field retrieval
* database aggregation
* caching
* background processing

Caching must always include organization and scope context in its key.

A cache must never allow one organization’s data to be returned to another.

---

## Database Constraints

Application validation is not enough.

The database should enforce important invariants through:

* foreign keys
* unique constraints
* required fields
* indexes
* appropriate cascading behavior

Tenant-owned relationship models should make cross-organization associations difficult or impossible.

---

## Persistence Engineering Rules

1. Persistence never leaks upward.
2. Every tenant-owned query requires `organizationId`.
3. Repositories return business objects.
4. Prisma types do not define the application architecture.
5. Workspace services never import Prisma.
6. Engines never retrieve persistent data.
7. Database constraints reinforce application rules.
8. Authentication identity and business authorization remain separate.
9. Important mutations create audit history.
10. Generated data is replaced incrementally, not through a full-system rewrite.

---

## Success Criteria for v0.7

Version 0.7 is complete when:

* users authenticate through real sessions
* authenticated identities resolve to Syntrix users and memberships
* organizations persist in PostgreSQL
* hierarchy entities persist in PostgreSQL
* core operational repositories use PostgreSQL
* tenant isolation is enforced in every repository
* generated data is removed from migrated domains
* important mutations create audit events
* existing executive workspaces continue to function
* no page or component knows that persistence changed
* the complete engineering audit passes
