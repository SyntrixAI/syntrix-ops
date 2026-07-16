# Syntrix v1 Architecture

## 1. Purpose

Syntrix is an AI Executive Operating System for multi-location businesses.

Its purpose is not merely to display operational data. Syntrix observes business activity, interprets what matters, recommends action, supports execution, and learns from outcomes.

The core operating loop is:

```text
Observe
   ↓
Understand
   ↓
Recommend
   ↓
Execute
   ↓
Learn
```

Every feature, workspace, service, engine, and data model must support this loop.

Every page should help the user make exactly one better executive decision.

Syntrix should behave like an experienced COO, not a traditional business-intelligence dashboard.

---

## 2. Core Architectural Principles

### 2.1 One decision per workspace

Every executive workspace must answer one primary business question.

Examples:

```text
Daily Brief
What requires my attention today?

Organization
Where does leadership attention belong across the organization?

Operations
What operational issues require investigation?

Investigation
Why is this happening, and what should we do?

Execution
What actions should be completed now?

Intelligence
What does Syntrix currently understand and recommend?
```

Supporting information may be included, but every workspace must end with a clear decision, recommendation, or next action.

### 2.2 One owner per business concept

Every business concept must have exactly one architectural owner.

If multiple layers independently calculate, retrieve, or define the same concept, the boundary is incorrect.

Examples:

| Business concept        | Architectural owner       |
| ----------------------- | ------------------------- |
| Organization            | Organization Repository   |
| Company                 | Company Repository        |
| Region                  | Region Repository         |
| District                | District Repository       |
| Location                | Location Repository       |
| Signal                  | Signal Repository         |
| Priority                | Priority Repository       |
| Recommendation          | Recommendation Repository |
| Execution item          | Execution Repository      |
| Outcome                 | Outcome Repository        |
| Current health          | Health Service            |
| Hierarchy relationships | Hierarchy Engine          |
| Authorized scope        | Scope Engine              |
| Executive narrative     | Narrative Engine          |
| Executive brief         | Intelligence Layer        |
| Learning summary        | Learning Engine           |

### 2.3 Persist history; compute understanding

Syntrix persists facts, decisions, commitments, and outcomes.

Syntrix computes current interpretations.

Persisted records provide evidence and auditability.

Computed objects provide the current executive understanding of those records.

### 2.4 Dependency direction must remain explicit

Foundational modules must use direct imports.

Barrel exports may be used by orchestration layers, but should not be used where they can create hidden initialization graphs or circular dependencies.

```text
Data modules
→ Direct engine imports

Engines
→ Direct repository imports when repository access is required

Repositories
→ Direct data-provider imports

Workspace services
→ Engine and repository barrels allowed

Pages
→ Service barrels allowed
```

### 2.5 Tenant isolation fails closed

Every tenant-owned repository operation requires an `organizationId`.

Records with missing organization ownership must not be returned as compatibility fallbacks.

The default behavior for missing or mismatched tenant ownership is:

```text
Return no record
or
Throw for an invalid repository contract
```

Never expose unowned records.

---

## 3. Permanent Architecture

The permanent dependency flow is:

```text
Raw Business Facts
        ↓
Repositories and Business Engines
        ↓
Intelligence Layer and Computed Services
        ↓
Workspace Services
        ↓
Executive Workspaces
        ↓
Conversation Layer
```

A more detailed view:

```text
Executive Workspaces
        │
        ▼
Workspace Services
        │
        ├──────────────────────┐
        ▼                      ▼
Repositories          Computed Services
        │                      │
        ▼                      ▼
Persisted Records       Business Engines
        │                      │
        └──────────┬───────────┘
                   ▼
             Raw Business Facts
```

Repositories and engines are separate responsibilities.

Repositories retrieve authoritative records.

Engines reason from facts.

Services orchestrate both.

---

## 4. Architectural Layers

## 4.1 Raw Data

Raw data represents source evidence.

Examples:

```text
POS transactions
Labor records
Inventory counts
Schedules
Weather observations
Imported operational events
User actions
Integration payloads
```

Raw data must not contain executive reasoning.

Raw data may be mocked during development but will eventually come from live integrations, APIs, background jobs, and database records.

---

## 4.2 Repositories

Repositories retrieve authoritative persisted records.

They isolate callers from the storage implementation.

Current flow:

```text
Repository
→ Mock data
```

Future flow:

```text
Repository
→ Database
```

Repositories may:

```text
Retrieve records by tenant
Retrieve records by ID
Retrieve records by parent relationship
Retrieve records by location or scope identifiers
Return null or empty collections when records do not exist
```

Repositories must not:

```text
Calculate metrics
Rank opportunities
Generate recommendations
Determine user authorization
Render UI
Know about pages
```

Examples:

```text
companyRepository
regionRepository
districtRepository
locationRepository
signalRepository
priorityRepository
assessmentRepository
executionRepository
```

---

## 4.3 Business Engines

Each engine answers one business question.

Examples:

| Engine                | Business question                               |
| --------------------- | ----------------------------------------------- |
| Signal Engine         | What meaningful operational condition occurred? |
| Decision Engine       | What deserves leadership attention?             |
| Recommendation Engine | What should leadership do?                      |
| Execution Engine      | How should the recommendation become action?    |
| Hierarchy Engine      | How are organizational entities related?        |
| Scope Engine          | Which entities belong to this authorized scope? |
| Metrics Engine        | What does current performance measure?          |
| Root Cause Engine     | Why is this happening?                          |
| Trend Engine          | Is this behavior changing over time?            |
| Learning Engine       | What should Syntrix learn from outcomes?        |

Engines must not:

```text
Render UI
Know about pages
Know about authentication
Read request state
Own persistence
```

Engines should receive explicit inputs and return deterministic business outputs where possible.

---

## 4.4 Hierarchy Engine

The Hierarchy Engine owns organizational relationship reasoning.

It answers:

```text
What is this entity?
Who is its parent?
Who are its children?
What are its ancestors?
```

Primary responsibilities:

```text
resolveHierarchyEntity
getParent
getChildren
getAncestors
```

The Hierarchy Engine must use tenant-aware repositories.

It does not determine user authorization.

---

## 4.5 Scope Engine

The Scope Engine owns authorized organizational expansion.

It answers:

> Which hierarchy entities and locations belong to this operating scope?

Responsibilities include:

```text
Expand company scope
Expand region scope
Expand district scope
Expand location scope
Resolve descendant locations
Determine scope membership
```

Hierarchy context must not be confused with workspace authorization.

A location-level user may need access to parent hierarchy context while still being prohibited from opening district-level executive workspaces.

---

## 4.6 Intelligence Layer

The Intelligence Layer synthesizes engine outputs into executive understanding.

Completed intelligence concepts include:

```text
Recommendation Context
Executive Brief
Opportunity Ranking
Executive Decision
Executive Impact
Operational Memory integration
```

Future intelligence concepts include:

```text
Executive Timeline
Learning Summary
Business Narrative
Conversation
```

The Intelligence Layer may:

```text
Combine engine outputs
Explain recommendations
Present evidence and confidence
Summarize business implications
Create executive conclusions
```

It must not:

```text
Own raw business data
Retrieve directly from storage
Render UI
Perform page-specific assembly
```

---

## 4.7 Computed Services

Computed services expose current interpreted business state.

They are used when a concept is computed rather than retrieved as a durable record.

Examples:

```text
Current Location Health
Current Timeline
Current Operational Memory Summary
Current Executive Brief
```

The first implemented computed service is:

```text
getLocationHealth
```

Computed services may orchestrate repositories and engines.

They must not become generic dumping grounds for workspace logic.

---

## 4.8 Workspace Services

Workspace services assemble everything required by one executive workspace.

They answer:

> What information does this workspace require to support its decision?

Examples:

```text
getDailyBrief
getOrganizationWorkspace
getOperationsWorkspace
getInvestigationWorkspace
getExecutionWorkspace
getIntelligenceWorkspace
getDistrictWorkspace
getLocationWorkspace
```

Workspace services may:

```text
Validate required request context
Retrieve records through repositories
Use scope-aware data
Invoke engines
Invoke computed services
Assemble the final workspace model
```

Workspace services must not:

```text
Render UI
Contain reusable business reasoning
Import raw tenant-owned data directly
Know database implementation details
```

---

## 4.9 Executive Workspaces

Executive Workspaces render workspace-service outputs.

They should be composition-focused.

Pages assemble features.

Features assemble business components.

UI components remain presentation-only.

Executive Workspaces must not:

```text
Import business data directly
Call repositories directly
Calculate business rules
Assemble global datasets
Determine tenant access
```

Deep routes include:

```text
/districts/[id]
/locations/[id]
/operations/investigations/[id]
```

All deep routes must enforce tenant and user scope through workspace services before rendering their contents.

---

## 4.10 Conversation Layer

The Conversation Layer will allow leaders to interact with Syntrix’s intelligence through natural language.

It will eventually support:

```text
Ask Syntrix
Explain this recommendation
Why is this happening?
What changed?
What should I do next?
What if we delay this action?
Compare these locations
Summarize this district
```

Conversation must be backed by the Intelligence Layer and existing business objects.

It must not become a separate source of business truth.

---

## 5. Business Domains

Syntrix contains six permanent business domains.

## 5.1 Organization

Answers:

> Who is responsible, and how is the business structured?

Contains:

```text
Organizations
Companies
Regions
Districts
Locations
Users
Roles
Scope
Permissions
```

Primary owners:

```text
Hierarchy repositories
Hierarchy Engine
Scope Engine
Request Context
```

## 5.2 Operations

Answers:

> What is happening?

Contains:

```text
Raw events
Signals
Priorities
Investigations
Evidence
Context
Root causes
Trends
```

Primary owners:

```text
Signal Engine
Decision Engine
Root Cause Engine
Trend Engine
Operations repositories
```

## 5.3 Execution

Answers:

> What should be done, and is it being completed?

Contains:

```text
Recommendations
Execution items
Owners
Assignments
Statuses
Dependencies
Success criteria
Verification
Outcomes
```

Primary owners:

```text
Recommendation Engine
Execution Engine
Execution repositories
```

## 5.4 Intelligence

Answers:

> What does Syntrix understand and recommend?

Contains:

```text
Executive briefs
Executive decisions
Recommendation context
Executive impact
Confidence
Narratives
Opportunity ranking
```

Primary owner:

```text
Intelligence Layer
```

## 5.5 Learning

Answers:

> What has Syntrix learned from past decisions and outcomes?

Contains:

```text
Recommendation history
Outcome tracking
Pattern history
Operational memory records
Confidence calibration
Learning summaries
```

Primary owners:

```text
Learning Engine
Memory repositories
Outcome repositories
```

## 5.6 Conversation

Answers:

> How can an executive explore Syntrix’s understanding?

Contains:

```text
Questions
Answers
Explanations
Follow-up reasoning
What-if analysis
Executive conversation history
```

Primary owner:

```text
Conversation Layer
```

---

## 6. Persisted, Computed, and Hybrid Objects

## 6.1 Persisted records

Persisted records represent facts, decisions, commitments, or outcomes.

Persist:

```text
Organizations
Users
Hierarchy entities
Raw events
Signals
Priorities
Recommendations
Execution items
Activity events
Outcome records
Operational memory records
Published assessments
Delivered briefs
Health snapshots
Formal reports
```

## 6.2 Computed objects

Computed objects represent current interpretations.

Compute:

```text
Current location health
Current assessment
Executive metrics
Priority rankings
Opportunity rankings
Current daily brief
Current business narrative
Current timeline presentation
Scope expansion
Breadcrumb hierarchy
```

## 6.3 Hybrid objects

Some objects have both a computed current form and persisted historical snapshots.

| Object             | Current form     | Persisted history             |
| ------------------ | ---------------- | ----------------------------- |
| Location health    | Computed         | Health snapshots              |
| Assessment         | Computed draft   | Published assessment versions |
| Executive brief    | Computed         | Delivered briefs              |
| Metrics            | Computed         | Reporting snapshots           |
| Narrative          | Computed         | Published reports             |
| Operational memory | Computed summary | Memory records                |
| Timeline           | Computed view    | Activity and business events  |

---

## 7. Tenant and Request Context

Every production request must resolve a trusted request context.

The request context should eventually contain:

```js
{
  userId,
  organizationId,
  user,
  role,
  scope,
}
```

Workspace services must not accept arbitrary organization IDs from the browser.

Tenant ownership must come from authenticated request context.

Repository operations require the trusted `organizationId`.

User authorization is resolved through the Scope Engine and workspace-specific access policies.

---

## 8. Routing Model

## Main executive workspaces

```text
/
/organization
/operations
/execution
/intelligence
```

## Deep workspaces

```text
/districts/[id]
/locations/[id]
/operations/investigations/[id]
```

There is intentionally no:

```text
/districts
```

Organization is the hierarchy entry point.

There is currently no region workspace route.

Region entities must not link to nonexistent routes.

A region workspace should only be introduced after defining the single executive decision it supports.

---

## 9. Import Rules

### Foundational modules

Data generators, engines, and repositories use direct imports.

Example:

```js
import { generateSignals } from "../lib/engines/signalEngine";
```

Avoid:

```js
import { generateSignals } from "../lib/engines";
```

when the importing module participates in foundational initialization.

### Orchestration modules

Workspace services and pages may use barrel exports where they do not introduce circular dependencies.

### Prohibited dependency directions

```text
Repositories → Engines
Repositories → Workspace Services
Engines → Pages
Engines → UI Components
Data → Workspace Services
UI Components → Repositories
```

---

## 10. Target `src/lib` Structure

The current structure should not be reorganized through a disruptive one-time refactor.

The long-term target is:

```text
src/lib/

  repositories/
    organization/
    operations/
    execution/
    learning/

  engines/
    hierarchy/
    signal/
    decision/
    recommendation/
    execution/
    metrics/
    rootCause/
    trend/
    learning/

  intelligence/
    executiveBrief/
    recommendationContext/
    executiveDecision/
    executiveImpact/
    narrative/

  services/
    workspace/
    health/
    timeline/
    memory/
    request/
    navigation/

  conversation/
```

Top-level directories remain organized by architectural responsibility.

Within each layer, files may be grouped by business domain as the codebase grows.

Reorganization should occur incrementally when it improves clarity, not simply to match the target diagram.

---

## 11. Database Migration Strategy

The repository contracts are the database abstraction.

A separate generic data-provider layer should not be introduced unless multiple repository implementations require shared infrastructure.

Current:

```text
Repository
→ Mock module
```

Future:

```text
Repository
→ Database client
```

Workspace services and engines must not change when repository internals move to a database.

The migration order should be:

```text
Organizations and users
Hierarchy entities
Raw events
Signals
Priorities
Recommendations
Execution items
Activity events
Operational memory records
Outcomes
Snapshots
```

Computed services should continue using repositories and engines rather than querying database tables directly.

---

## 12. Version Roadmap

## v0.5 — Executive Reasoning

Completed:

```text
Recommendation Context
Executive Brief
Opportunity Ranking
Executive Decision
Executive Impact
Operational Memory integration
Executive Workspace foundation
```

## v0.6 — Production Foundation

Focus:

```text
Tenant model
Request context
Repository layer
Tenant-safe hierarchy
Scope enforcement
Workspace security
Dependency cleanup
Persisted vs. computed boundaries
Authentication readiness
Database readiness
```

## v0.7 — Live Data Platform

Focus:

```text
Database
Authentication
APIs
Background jobs
Notifications
POS integration
Inventory integration
Scheduling integration
Sales integration
Labor integration
Weather integration
```

## v0.8 — Learning Engine

Focus:

```text
Recommendation history
Outcome tracking
Health snapshots
Pattern learning
Confidence calibration
Learning summaries
Organizational memory
```

## v0.9 — Syntrix Conversation

Focus:

```text
Ask Syntrix
Explain recommendations
Explore evidence
What-if analysis
Executive Timeline
Conversational intelligence
```

## v1.0 — Production Launch

Focus:

```text
Production deployment
Live integrations
Multi-tenant authentication
Reliable execution workflows
Auditable intelligence
Learning from outcomes
Executive conversation
```

---

## 13. Architectural Decision Checklist

Before introducing or changing a feature, answer:

1. What executive decision does this improve?
2. What information is required for that decision?
3. Which business concept owns the responsibility?
4. Is the information persisted, computed, or hybrid?
5. Does a repository retrieve it?
6. Does an engine reason about it?
7. Does Intelligence synthesize it?
8. Does a workspace service assemble it?
9. Does the UI only render it?
10. Is tenant and role scope enforced?
11. Does the change preserve dependency direction?
12. Does the architecture already contain the necessary layer?

Do not introduce a new layer unless the existing architecture cannot honestly own the responsibility.

---

## 14. Syntrix Architecture Contract

The following rules are permanent unless replaced by an explicit architectural decision:

1. Every page helps the user make one better decision.
2. Every business concept has one architectural owner.
3. Repositories retrieve authoritative persisted records.
4. Engines reason from business facts.
5. Intelligence explains and synthesizes reasoning.
6. Computed services expose current interpreted state.
7. Workspace services orchestrate.
8. Executive Workspaces render.
9. Tenant isolation fails closed.
10. History is persisted.
11. Understanding is computed.
12. Outcomes create learning.
13. Foundational imports remain explicit.
14. Conversation uses existing intelligence rather than creating separate truth.
15. Syntrix must behave like an experienced COO, not a dashboard.
