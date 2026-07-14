# Syntrix Production Foundation

## Purpose

This document defines the production identity, tenancy, and data-access model for Syntrix.

The primary rule is:

> Every business record belongs to one organization.

No workspace, service, API route, or background job may access business data without an organization context.

---

## Tenant Model

An organization is the top-level customer account.

Examples:

- SplashBrands
- GEN Korean BBQ
- Example Restaurant Group

Each organization owns its:

- Regions
- Districts
- Locations
- Users
- Signals
- Priorities
- Assessments
- Recommendations
- Execution items
- Operational memory
- Reports

---

## Identity Model

A user belongs to an organization and receives a role and scope.

```txt
User
→ Organization
→ Role
→ Scope