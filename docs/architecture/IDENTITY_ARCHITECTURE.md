# Syntrix Identity Architecture

## Purpose

The identity architecture defines how Syntrix recognizes users, connects them to organizations, determines their responsibilities, and authorizes access to business data.

Authentication and business authorization are separate concerns.

The authentication provider confirms identity.

Syntrix owns organizations, memberships, roles, scope, permissions, and operational access.

---

## Architectural Goal

Syntrix must support:

* secure authentication
* persistent user accounts
* organization membership
* role-based access
* hierarchy-based scope
* multiple organizations per user
* invitation and onboarding workflows
* account suspension and membership removal
* auditable authorization changes

The identity system must integrate with the existing workspace and repository architecture without allowing authentication-provider concepts to leak throughout the application.

---

## Identity Flow

```text
External Identity
      ↓
Syntrix User
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

Each layer answers a different question.

| Layer                   | Question                                       |
| ----------------------- | ---------------------------------------------- |
| External identity       | Who authenticated?                             |
| Syntrix user            | Which Syntrix account is this?                 |
| Organization membership | Which organization are they operating in?      |
| Role                    | What responsibilities do they have?            |
| Permissions             | What actions may they perform?                 |
| Scope                   | Which organizational entities may they access? |
| Workspace authorization | May they open this workspace?                  |
| Repository enforcement  | Does this record belong to their organization? |

---

## Core Separation

### Authentication

Authentication answers:

> Who are you?

Clerk owns:

* login credentials
* passwordless authentication
* social authentication
* multi-factor authentication
* session issuance
* session validation
* identity verification
* external identity metadata

### Authorization

Authorization answers:

> What may you access or change?

Syntrix owns:

* organization membership
* business roles
* permissions
* hierarchy scope
* account status
* membership status
* workspace access
* business ownership
* authorization history

Clerk must not become the authoritative owner of Syntrix business authorization.

---

## Identity Boundary

Clerk identifies an external user.

A Clerk identity is not itself a complete Syntrix user.

```text
Clerk User
    ↓
External Identity Reference
    ↓
Syntrix User
```

Syntrix stores the external provider identifier:

```text
clerkUserId
```

This identifier links the authenticated session to the internal user record.

Application code outside the identity boundary should prefer the internal Syntrix user ID rather than depending directly on Clerk IDs.

---

## Domain Model

### User

A user represents a person known to Syntrix.

A user exists independently of any single organization.

Core fields:

```text
id
clerkUserId
email
firstName
lastName
status
lastAuthenticatedAt
createdAt
updatedAt
```

Recommended status values:

```text
active
suspended
disabled
```

A user may belong to multiple organizations.

A user must not receive business access from the global user record alone.

---

### Organization Membership

A membership connects a user to an organization.

The membership owns organization-specific authorization.

Core fields:

```text
id
organizationId
userId
role
scopeLevel
scopeEntityId
status
joinedAt
createdAt
updatedAt
```

Recommended membership status values:

```text
invited
active
suspended
revoked
```

A user may have different roles and scopes in different organizations.

Example:

```text
User: Jordan Lee

Organization A
Role: District Manager
Scope: District 12

Organization B
Role: Consultant
Scope: Company
```

---

### Invitation

An invitation represents pending organization access.

Core fields:

```text
id
organizationId
email
role
scopeLevel
scopeEntityId
status
invitedByUserId
expiresAt
acceptedAt
createdAt
updatedAt
```

Recommended status values:

```text
pending
accepted
expired
revoked
```

An invitation does not grant access until it is accepted and an active membership exists.

---

## Organization Context

Every authenticated request that accesses tenant-owned data must resolve an active organization context.

The request context should eventually contain:

```js
{
  user: {
    id,
    email,
    status,
  },
  membership: {
    id,
    organizationId,
    role,
    scopeLevel,
    scopeEntityId,
    status,
  },
  organization: {
    id,
    name,
    status,
  },
}
```

This object represents the authorized Syntrix context for the current request.

Pages, workspace services, and repositories should not independently reconstruct identity from raw session data.

---

## Current Organization Selection

A user may eventually belong to multiple organizations.

Syntrix must therefore distinguish between:

* authenticated user
* available organizations
* currently selected organization

The selected organization must be validated against active memberships.

A client-provided organization ID must never be trusted without membership verification.

Valid flow:

```text
Authenticated Session
        ↓
Resolve Syntrix User
        ↓
Load Active Memberships
        ↓
Select Organization
        ↓
Verify Membership
        ↓
Build Request Context
```

An organization switch changes the active membership context, not the authenticated identity.

---

## Role Model

Roles describe business responsibility.

Initial roles may include:

```text
owner
administrator
coo
regional_manager
district_manager
general_manager
operator
viewer
```

Roles should use stable internal identifiers.

User-facing labels may change without changing the stored role identifier.

Example:

```text
Stored role:
district_manager

Displayed label:
District Manager
```

Roles must not be scattered as repeated string comparisons throughout pages and components.

Role meaning should be centralized in the authorization layer.

---

## Permission Model

Roles and permissions are related but not identical.

A role is a named collection of responsibilities.

A permission represents a specific capability.

Example permissions:

```text
organization.view
organization.manage

members.view
members.invite
members.manage_roles
members.manage_scope

regions.view
regions.manage

districts.view
districts.manage

locations.view
locations.manage

signals.view
signals.manage

priorities.view
priorities.manage

assessments.view

recommendations.view
recommendations.approve
recommendations.reject

execution.view
execution.create
execution.assign
execution.complete

reports.view

audit.view
```

Authorization checks should answer explicit questions:

```js
canViewOrganization(membership);
canInviteMembers(membership);
canApproveRecommendation(membership, recommendation);
canCompleteExecutionItem(membership, executionItem);
```

Avoid vague checks such as:

```js
isManager(user);
```

Explicit capabilities produce clearer business rules.

---

## Role-to-Permission Mapping

The initial implementation may use static role definitions.

Example:

```js
const ROLE_PERMISSIONS = {
  owner: ["*"],

  administrator: [
    "organization.view",
    "organization.manage",
    "members.view",
    "members.invite",
    "members.manage_roles",
    "members.manage_scope",
  ],

  coo: [
    "organization.view",
    "regions.view",
    "districts.view",
    "locations.view",
    "signals.view",
    "priorities.view",
    "assessments.view",
    "recommendations.view",
    "recommendations.approve",
    "execution.view",
    "execution.create",
    "execution.assign",
    "execution.complete",
    "reports.view",
  ],
};
```

The initial permission system may remain code-defined.

Database-defined custom roles should not be introduced until a real customer requirement justifies them.

---

## Hierarchy Scope

Role answers:

> What type of responsibility does the user have?

Scope answers:

> Where does that responsibility apply?

Supported scope levels:

```text
company
region
district
location
```

Examples:

| Role             | Scope level | Scope entity     |
| ---------------- | ----------- | ---------------- |
| COO              | company     | Organization     |
| Regional Manager | region      | North Texas      |
| District Manager | district    | Dallas Metro     |
| General Manager  | location    | Plano            |
| Viewer           | district    | Houston District |

Scope must be resolved through the hierarchy engine rather than manually duplicated throughout workspace services.

---

## Scope Representation

A membership stores:

```text
scopeLevel
scopeEntityId
```

Examples:

```js
{
  role: "coo",
  scopeLevel: "company",
  scopeEntityId: organizationId,
}
```

```js
{
  role: "district_manager",
  scopeLevel: "district",
  scopeEntityId: districtId,
}
```

```js
{
  role: "general_manager",
  scopeLevel: "location",
  scopeEntityId: locationId,
}
```

The scope engine expands this assignment into authorized descendants.

```text
Company
    ↓
Regions
    ↓
Districts
    ↓
Locations
```

---

## Role and Scope Validation

Not every role and scope combination should be valid.

Examples:

```text
COO
Allowed scope: company

Regional Manager
Allowed scope: region

District Manager
Allowed scope: district

General Manager
Allowed scope: location
```

Validation should prevent contradictory assignments such as:

```text
General Manager
Scope: company
```

Role and scope compatibility must be enforced when:

* inviting a member
* accepting an invitation
* changing a role
* changing a scope
* importing users
* seeding data

---

## Authorization Layers

Syntrix uses defense in depth.

### 1. Route Protection

Prevents unauthenticated users from opening protected application routes.

This layer answers:

> Is there a valid authenticated session?

It does not replace business authorization.

---

### 2. Request Context Resolution

Resolves:

* Syntrix user
* selected organization
* active membership
* role
* scope

This layer answers:

> Which authenticated business context applies to this request?

---

### 3. Workspace Authorization

Workspace services enforce access to business workspaces.

Examples:

```js
canOpenOrganizationWorkspace(context);
canOpenDistrictWorkspace(context, districtId);
canOpenLocationWorkspace(context, locationId);
```

Workspace authorization should use both:

* permission
* hierarchy scope

---

### 4. Repository Tenant Enforcement

Repositories require:

```text
organizationId
```

This layer ensures that data from another organization cannot be returned even if an upper authorization layer contains a defect.

Repositories do not decide whether a user may open a workspace.

They enforce tenant ownership.

---

### 5. Mutation Authorization

Write operations require explicit permission checks.

A user being allowed to view an entity does not imply permission to modify it.

Examples:

```js
canViewRecommendation(context, recommendation);
canApproveRecommendation(context, recommendation);
```

These must remain separate capabilities.

---

## Request Context Service

The current fixture-based `getUserContext()` should eventually be replaced by a real identity service.

Recommended responsibility:

```text
Resolve one authenticated and authorized Syntrix request context.
```

Possible interface:

```js
getRequestContext({
  selectedOrganizationId,
});
```

The service should:

1. read the authenticated Clerk identity
2. resolve the Syntrix user
3. verify that the user is active
4. load active memberships
5. resolve the selected organization
6. verify the organization is active
7. verify the membership is active
8. return the normalized request context

It should not:

* retrieve operational workspace data
* calculate hierarchy descendants
* query priorities or recommendations
* contain page-specific logic

---

## Session Flow

```text
User Authenticates
        ↓
Clerk Creates Session
        ↓
Syntrix Resolves Clerk User ID
        ↓
Syntrix Loads Internal User
        ↓
Syntrix Loads Active Membership
        ↓
Syntrix Builds Request Context
        ↓
Workspace Service Authorizes Request
        ↓
Repositories Enforce Organization Ownership
```

A valid Clerk session alone does not guarantee access to Syntrix.

Access may still be denied when:

* no Syntrix user exists
* the user is disabled
* no active organization membership exists
* the selected organization is invalid
* the membership is suspended or revoked
* the organization is suspended
* the requested workspace is outside the user’s scope
* the required permission is missing

---

## User Provisioning

When an authenticated Clerk identity does not yet map to a Syntrix user, Syntrix must use an explicit provisioning path.

Possible provisioning sources:

* accepted organization invitation
* organization onboarding
* administrator-created membership
* approved system migration

Syntrix should not automatically create an unrestricted business user merely because a Clerk session exists.

A provisioned user still requires an active organization membership before receiving tenant access.

---

## Invitation Flow

```text
Authorized Member Creates Invitation
        ↓
Syntrix Validates Role and Scope
        ↓
Invitation Record Created
        ↓
Invitation Delivered
        ↓
Recipient Authenticates
        ↓
External Identity Resolved
        ↓
Syntrix User Created or Reused
        ↓
Membership Created
        ↓
Invitation Marked Accepted
        ↓
Audit Event Created
```

Invitation acceptance should be transactional where practical.

The system must prevent:

* accepting an expired invitation
* accepting a revoked invitation
* using an invitation for a different email without an approved policy
* creating duplicate active memberships
* assigning scope outside the inviter’s authority

---

## Membership Lifecycle

Recommended lifecycle:

```text
invited
    ↓
active
    ↓
suspended
    ↓
active
```

or:

```text
active
    ↓
revoked
```

### Suspended

Temporary access removal.

The membership remains available for restoration and audit history.

### Revoked

Access is terminated.

A revoked membership should not be silently reactivated. A new invitation or deliberate administrative action should be required.

Historical records must preserve the membership and user references associated with prior actions.

---

## User Lifecycle

A global user may be:

```text
active
suspended
disabled
```

A suspended user cannot access any organization.

Disabling a user should not delete historical identity references from:

* audit events
* approvals
* assignments
* execution history
* timeline events

Hard deletion of users should be avoided when auditability matters.

---

## Organization Lifecycle

Recommended organization status values:

```text
active
suspended
archived
```

A suspended organization should deny normal operational access while preserving its data.

An archived organization should remain available only through explicitly authorized administrative or retention workflows.

---

## Unauthorized Behavior

Unauthorized access should reveal as little information as possible.

A user requesting an entity outside their organization or scope should generally receive the same result as requesting a missing entity.

The application should not confirm:

* that another organization exists
* that an inaccessible location exists
* that a restricted investigation exists
* that another user belongs to the organization

The UI may present:

```text
Workspace unavailable
```

or route to an appropriate authorized destination.

---

## Server-Side Enforcement

Authorization must occur on the server.

Client-side navigation rules improve usability but are not security controls.

Hidden links and disabled buttons do not replace:

* request-context validation
* workspace authorization
* repository tenant enforcement
* mutation permission checks

Every sensitive write operation must be authorized again at execution time.

---

## Client-Side Access Information

The client may receive a limited authorization summary for interface rendering.

Example:

```js
{
  role: "district_manager",
  scopeLevel: "district",
  permissions: [
    "districts.view",
    "locations.view",
    "recommendations.approve",
  ],
}
```

This may be used to:

* hide unavailable navigation
* disable unauthorized actions
* explain why an action is unavailable

The server remains authoritative.

---

## Audit Requirements

Important identity and authorization changes must create audit events.

Examples:

```text
user.provisioned
user.suspended
user.reactivated
user.disabled

membership.created
membership.activated
membership.suspended
membership.reactivated
membership.revoked

membership.role_changed
membership.scope_changed

invitation.created
invitation.accepted
invitation.revoked
invitation.expired

organization.selected
organization.suspended
organization.reactivated
```

Audit events should include:

```text
organizationId
actorUserId
action
entityType
entityId
before
after
metadata
createdAt
```

Sensitive authentication data must never be stored inside general audit metadata.

---

## Initial Migration Strategy

Identity will replace the fixture-based user context incrementally.

### Phase 1 — Define Identity Contracts

* create identity architecture
* define normalized user context
* centralize role names
* centralize permission names
* define role-to-permission mapping
* define role-to-scope compatibility

### Phase 2 — Install Authentication

* configure Clerk
* protect application routes
* read authenticated session
* establish authentication boundary

### Phase 3 — Persist Users and Memberships

* create Prisma user model
* create organization membership model
* create invitation model
* seed development identities
* create identity repositories

### Phase 4 — Resolve Real Request Context

* replace fixture-based `getUserContext()`
* resolve Clerk identity to Syntrix user
* resolve organization membership
* validate account and membership status
* return normalized request context

### Phase 5 — Integrate Authorization

* preserve existing workspace authorization
* replace mock user roles with membership roles
* replace mock scope with membership scope
* verify every executive workspace
* verify every protected mutation

### Phase 6 — Remove Fixtures

* remove static user fixtures
* remove temporary identity adapters
* remove deprecated role checks
* run identity and tenant security audits

---

## Transitional Rule

During v0.7, fixture identity and authenticated identity may temporarily coexist.

There must be one clearly defined source of identity per environment or execution path.

The application must not silently combine:

* mock users
* authenticated users
* hard-coded roles
* persisted memberships

Temporary adapters must be isolated, named, documented, and removed before the v0.7 release audit.

---

## Initial Engineering Boundaries

Recommended modules may eventually include:

```text
src/lib/auth/
    getAuthenticatedIdentity.js

src/lib/identity/
    getRequestContext.js
    resolveCurrentOrganization.js
    roles.js
    permissions.js
    authorization.js

src/repositories/
    userRepository.js
    membershipRepository.js
    invitationRepository.js
```

The exact folder structure may be adjusted to fit the existing architecture, but responsibilities must remain separate.

---

## Identity Engineering Rules

1. Authentication and authorization remain separate.
2. Clerk confirms identity; Syntrix owns business access.
3. Global users do not directly own organization permissions.
4. Memberships own organization-specific role and scope.
5. Every protected request resolves an active membership.
6. Roles describe responsibility.
7. Permissions describe capability.
8. Scope describes where the capability applies.
9. Client-side restrictions never replace server authorization.
10. Repository tenant enforcement remains mandatory.
11. Authorization changes create audit events.
12. Cross-tenant failures must not reveal protected records.
13. Fixture identity is temporary and must not survive the v0.7 release audit.
14. Provider-specific identity details must not leak throughout the application.
15. Identity architecture must support multiple organizations per user.

---

## Success Criteria

The identity foundation is complete when:

* real users authenticate through Clerk
* Clerk identities resolve to internal Syntrix users
* users may hold organization memberships
* the active organization is validated
* roles are centrally defined
* permissions are centrally defined
* role and scope combinations are validated
* request context comes from authenticated identity
* workspace services use persisted membership role and scope
* unauthorized routes are protected
* unauthorized mutations are denied
* tenant isolation remains enforced by repositories
* identity and membership changes create audit events
* fixture-based identity is removed
* multiple organization memberships are supported by the domain model
* the complete engineering audit passes
