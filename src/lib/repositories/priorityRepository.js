import { priorities } from "../../data/priorities";

export function getPriorities({ organizationId } = {}) {
  if (!organizationId) {
    throw new Error("Priority repository requires an organization ID.");
  }

  return priorities.filter((priority) => {
    if (!priority.organizationId) {
      return true;
    }

    return priority.organizationId === organizationId;
  });
}