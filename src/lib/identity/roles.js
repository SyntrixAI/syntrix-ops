export const ROLES = Object.freeze({
  OWNER: "owner",
  ADMINISTRATOR: "administrator",
  COO: "coo",
  REGIONAL_MANAGER: "regional_manager",
  DISTRICT_MANAGER: "district_manager",
  GENERAL_MANAGER: "general_manager",
  OPERATOR: "operator",
  VIEWER: "viewer",
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.OWNER]: "Owner",
  [ROLES.ADMINISTRATOR]: "Administrator",
  [ROLES.COO]: "COO",
  [ROLES.REGIONAL_MANAGER]: "Regional Manager",
  [ROLES.DISTRICT_MANAGER]: "District Manager",
  [ROLES.GENERAL_MANAGER]: "General Manager",
  [ROLES.OPERATOR]: "Operator",
  [ROLES.VIEWER]: "Viewer",
});

const ROLE_SCOPE_LEVELS = Object.freeze({
  [ROLES.OWNER]: ["company"],
  [ROLES.ADMINISTRATOR]: ["company"],
  [ROLES.COO]: ["company"],
  [ROLES.REGIONAL_MANAGER]: ["region"],
  [ROLES.DISTRICT_MANAGER]: ["district"],
  [ROLES.GENERAL_MANAGER]: ["location"],
  [ROLES.OPERATOR]: ["company", "region", "district", "location"],
  [ROLES.VIEWER]: ["company", "region", "district", "location"],
});

export function getRoleLabel(role) {
  return ROLE_LABELS[role] ?? role;
}

export function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}

export function isRoleScopeCompatible({
  role,
  scopeLevel,
} = {}) {
  if (!isValidRole(role) || !scopeLevel) {
    return false;
  }

  return (
    ROLE_SCOPE_LEVELS[role]?.includes(scopeLevel) ??
    false
  );
}