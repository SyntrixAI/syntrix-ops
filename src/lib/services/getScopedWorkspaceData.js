import {
  expandScope,
  getScopedLocationIds,
  getScopedPriorities,
  getScopedExecutionItems,
} from "../engines";

import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";

export function getScopedWorkspaceData(user) {
  if (!user?.organizationId) {
    throw new Error("Scoped workspace data requires an organization user.");
  }

  const organization = expandScope(user.scope);
  const locationIds = getScopedLocationIds(organization);

  return {
    organizationId: user.organizationId,
    organization,
    locationIds,

    priorities: getScopedPriorities(priorities, locationIds),

    executionItems: getScopedExecutionItems(
      executionItems,
      locationIds,
    ),
  };
}