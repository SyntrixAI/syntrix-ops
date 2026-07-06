import {
  expandScope,
  getScopedLocationIds,
  getScopedPriorities,
  getScopedExecutionItems,
} from "../engines";

import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";

export function getScopedWorkspaceData(user) {
  const organization = expandScope(user?.scope);
  const locationIds = getScopedLocationIds(organization);

  return {
    organization,
    locationIds,
    priorities: getScopedPriorities(priorities, locationIds),
    executionItems: getScopedExecutionItems(executionItems, locationIds),
  };
}