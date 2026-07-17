# Syntrix Engineering Principles

These principles guide every engineering decision made in Syntrix.

When a principle conflicts with convenience, the principle wins.

---

# Product First

## 1. Every page helps the user make one better decision.

Pages are decision workspaces, not dashboards.

Every page should answer one executive question and end with a recommended action.

---

## 2. Product philosophy always wins.

Technical decisions support the product vision.

Never sacrifice usability, explainability, or clarity for architectural elegance.

---

# Architecture

## 3. One responsibility per layer.

Pages assemble.

Components present.

Services orchestrate.

Repositories retrieve data.

Engines calculate business logic.

No layer should perform another layer's responsibility.

---

## 4. Business concepts own the architecture.

Folders, components, services, and engines should be organized around business concepts rather than technical patterns.

Names should reflect the business language used by customers.

---

## 5. Data never lives inside the UI.

Components receive business objects.

Business logic belongs in engines.

Persistence belongs in repositories.

---

## 6. AI must always be explainable.

Recommendations require:

- supporting evidence
- reasoning
- confidence
- business impact

The user should always understand *why* Syntrix reached a conclusion.

---

# Code Quality

## 7. Components have one responsibility.

If a component becomes difficult to understand, split it.

Small focused components are preferred over large configurable ones.

---

## 8. Keep files honest.

A file should only import what it actually uses.

File names should accurately describe their responsibility.

If a file changes purpose, rename it.

---

## 9. Build for clarity before optimization.

Readable code outlives clever code.

Optimize only after the design is correct.

---

## 10. Duplicate knowledge is more dangerous than duplicate code.

When business rules exist in multiple places, consolidate them into one authoritative owner.

---

# Continuous Improvement

## 11. Leave every file better than you found it.

Whenever a file is modified:

- remove dead code
- reduce duplication
- improve naming
- improve readability
- adopt current conventions

Avoid large cleanup-only refactors unless they unlock future development.

---

## 12. Every commit moves the product forward.

A commit should improve at least one of:

- functionality
- architecture
- readability
- reliability
- maintainability

---

# Release Quality

## 13. Every release passes an engineering audit.

A release is not complete until it passes:

- Layering Audit
- Dependency Audit
- Tenant & Security Audit
- Legacy Cleanup Audit
- Architecture Review
- Release Readiness

The audit protects the long-term health of the product.

---

# Long-Term Thinking

## 14. Design systems, not features.

Every feature should strengthen the platform.

Whenever possible, build reusable capabilities rather than one-off implementations.

---

## 15. Build for the next five years.

Choose designs that make future work easier.

Prefer architecture that scales over shortcuts that solve only today's problem.