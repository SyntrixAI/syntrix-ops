import { memberships } from "../../data/memberships";
import { organizations } from "../../data/organizations";
import {
  getRoleLabel,
  isRoleScopeCompatible,
} from "../identity/roles";
import { getUserContext } from "./getUserContext";

export function getRequestContext({
  selectedOrganizationId,
} = {}) {
  const user = getUserContext();

  if (!user) {
    return createUnavailableContext();
  }

  if (user.status !== "active") {
    return createUnavailableContext();
  }

  const activeMemberships = memberships.filter(
    (membership) =>
      membership.userId === user.id &&
      membership.status === "active",
  );

  const membership = resolveMembership({
    memberships: activeMemberships,
    selectedOrganizationId,
  });

  if (!membership) {
    return createUnavailableContext({
      user,
    });
  }

  const organization = organizations.find(
    (organization) =>
      organization.id === membership.organizationId,
  );

  if (!organization || organization.status !== "active") {
    return createUnavailableContext({
      user,
    });
  }

  validateMembership(membership);

  const scope = {
    level: membership.scopeLevel,
    id: membership.scopeEntityId,
  };

  return {
    authenticated: true,

    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: getUserName(user),
      status: user.status,
    },

    membership: {
      id: membership.id,
      organizationId: membership.organizationId,
      userId: membership.userId,
      role: membership.role,
      roleLabel: getRoleLabel(membership.role),
      scopeLevel: membership.scopeLevel,
      scopeEntityId: membership.scopeEntityId,
      status: membership.status,
      homeWorkspace: membership.homeWorkspace,
    },

    organization: {
      id: organization.id,
      name: organization.name,
      status: organization.status,
    },

    userId: user.id,
    organizationId: organization.id,
    role: membership.role,
    scope,
  };
}

function resolveMembership({
  memberships,
  selectedOrganizationId,
}) {
  if (selectedOrganizationId) {
    return (
      memberships.find(
        (membership) =>
          membership.organizationId ===
          selectedOrganizationId,
      ) ?? null
    );
  }

  if (memberships.length === 1) {
    return memberships[0];
  }

  return null;
}

function validateMembership(membership) {
  if (
    !membership.scopeLevel ||
    !membership.scopeEntityId
  ) {
    throw new Error(
      `Membership "${membership.id}" does not have a valid scope.`,
    );
  }

  if (
    !isRoleScopeCompatible({
      role: membership.role,
      scopeLevel: membership.scopeLevel,
    })
  ) {
    throw new Error(
      `Membership "${membership.id}" has an incompatible role and scope.`,
    );
  }
}

function getUserName(user) {
  return [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ");
}

function createUnavailableContext({
  user = null,
} = {}) {
  return {
    authenticated: false,

    user,
    membership: null,
    organization: null,

    userId: user?.id ?? null,
    organizationId: null,
    role: null,
    scope: null,
  };
}