export function getScopedPriorities(priorities = [], locationIds = []) {
  return priorities.filter((priority) =>
    locationIds.includes(priority.locationId),
  );
}