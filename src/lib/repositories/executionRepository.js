import {
  getExecutionItemRecords,
} from "../datasources";

export function getExecutionItems({
  organizationId,
} = {}) {
  if (!organizationId) {
    throw new Error(
      "Execution repository requires an organization ID.",
    );
  }

  return getExecutionItemRecords().filter(
    (item) =>
      item.organizationId === organizationId,
  );
}