import {
  generateContextInsights,
} from "../engines/contextEngine";
import {
  getContextFactorsByLocation,
} from "../repositories/contextRepository";

export function getInvestigationContext({
  organizationId,
  priority,
} = {}) {
  if (!organizationId) {
    throw new Error(
      "Investigation context requires an organization ID.",
    );
  }

  if (!priority) {
    return null;
  }

  const factors =
    getContextFactorsByLocation({
      organizationId,
      locationId: priority.locationId,
    });

  const contextByPriority =
    generateContextInsights(
      [priority],
      factors
        ? {
            [priority.locationId]: factors,
          }
        : {},
    );

  return contextByPriority[priority.id] ?? null;
}