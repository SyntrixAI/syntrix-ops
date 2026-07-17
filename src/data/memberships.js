import { ROLES } from "../lib/identity/roles";

export const memberships = [
  {
    id: "membership-coo-syntrix-demo",
    organizationId: "org-syntrix-demo",
    userId: "coo",
    role: ROLES.COO,
    scopeLevel: "company",
    scopeEntityId: "syntrix-demo",
    status: "active",
    homeWorkspace: "/",
  },
  {
    id: "membership-district-north-syntrix-demo",
    organizationId: "org-syntrix-demo",
    userId: "district-north",
    role: ROLES.DISTRICT_MANAGER,
    scopeLevel: "district",
    scopeEntityId: "north-texas",
    status: "active",
    homeWorkspace: "/districts/north-texas",
  },
  {
    id: "membership-gm-plano-syntrix-demo",
    organizationId: "org-syntrix-demo",
    userId: "gm-plano",
    role: ROLES.GENERAL_MANAGER,
    scopeLevel: "location",
    scopeEntityId: "plano",
    status: "active",
    homeWorkspace: "/locations/plano",
  },
];