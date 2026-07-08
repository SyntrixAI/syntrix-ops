# Syntrix Routing Architecture

## Purpose

This document defines the intended routing model for Syntrix workspaces.

Syntrix uses `/organization` as the main hierarchy entry point. Entity detail routes remain available for deep-dive workspaces.

---

## Main Workspace Routes

| Route | Purpose | Status |
|---|---|---|
| `/` | Daily Briefing | Active |
| `/organization` | Role-aware hierarchy workspace | Active |
| `/operations` | Active operational priorities | Active |
| `/execution` | Execution playbooks and workflows | Active |
| `/intelligence` | Syntrix Intelligence briefing | Active |

---

## Detail Workspace Routes

| Route | Purpose | Status |
|---|---|---|
| `/districts/[id]` | District deep-dive workspace | Active |
| `/locations/[id]` | Location deep-dive workspace | Active |
| `/operations/investigations/[id]` | Investigation deep-dive workspace | Active |

---

## Redirects

| Route | Redirects To | Reason |
|---|---|---|
| `/locations` | `/organization` | Organization is now the hierarchy entry point |

---

## Intentionally Missing Routes

| Route | Reason |
|---|---|
| `/districts` | Districts are accessed through `/organization` or direct detail links |
| `/regions` | Regions are accessed through `/organization` |
| `/regions/[id]` | Future route; currently not active unless implemented |
| `/organization/regions/[id]` | Future route; only use if region workspace is implemented |

---

## Routing Principle

Syntrix should follow this hierarchy:

```txt
/organization
→ region comparison
→ district detail
→ location detail
→ investigation detail