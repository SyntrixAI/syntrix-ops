import { executionItems } from "../../data/executionItems";

export function getExecutionItems({ organizationId } = {}) {
  if (!organizationId) {
    throw new Error(
      "Execution repository requires an organization ID.",
    );
  }

  return executionItems.filter(
    (item) => item.organizationId === organizationId,
  );
}