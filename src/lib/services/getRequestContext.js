import { organizations } from "../../data/organizations";
import { getUserContext } from "./getUserContext";

export function getRequestContext() {
  const user = getUserContext();

  if (!user) {
    return {
      authenticated: false,
      user: null,
      userId: null,
      organization: null,
      organizationId: null,
      role: null,
      scope: null,
    };
  }

  const organization = organizations.find(
    (organization) => organization.id === user.organizationId,
  );

  if (!organization) {
    throw new Error(
      `Organization "${user.organizationId}" was not found for user "${user.id}".`,
    );
  }

  if (organization.status !== "active") {
    throw new Error(
      `Organization "${organization.id}" is not active.`,
    );
  }

  if (!user.scope?.level || !user.scope?.id) {
    throw new Error(
      `User "${user.id}" does not have a valid scope.`,
    );
  }

  return {
    authenticated: true,

    user,
    userId: user.id,

    organization,
    organizationId: organization.id,

    role: user.role,
    scope: user.scope,
  };
}