import {
  getPriorityRecords,
} from "../datasources";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Priority repository requires an organization ID.",
    );
  }
}

function getOrganizationPriorities(organizationId) {
  requireOrganizationId(organizationId);

  return getPriorityRecords().filter(
    (priority) =>
      priority.organizationId === organizationId,
  );
}

export function getPriorities({
  organizationId,
} = {}) {
  return getOrganizationPriorities(organizationId);
}

export function getPriorityById({
  organizationId,
  priorityId,
} = {}) {
  if (!priorityId) {
    throw new Error(
      "Priority repository requires a priority ID.",
    );
  }

  return (
    getOrganizationPriorities(organizationId).find(
      (priority) =>
        String(priority.id) === String(priorityId),
    ) ?? null
  );
}