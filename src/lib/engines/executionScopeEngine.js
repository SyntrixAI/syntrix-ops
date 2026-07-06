export function getScopedExecutionItems(executionItems = [], locationIds = []) {
  return executionItems.filter((item) =>
    locationIds.includes(item.locationId),
  );
}