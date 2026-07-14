import { executionItems } from "../../data/executionItems";

export function getExecutionItems({ organizationId } = {}) {
  if (!organizationId) {
    throw new Error("Execution repository requires an organization ID.");
  }

  return executionItems.filter((item) => {
    if (!item.organizationId) {
      return true;
    }

    return item.organizationId === organizationId;
  });
}