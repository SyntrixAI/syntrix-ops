import {
  expandScope,
  getScopedLocationIds,
  getScopedPriorities,
  getScopedExecutionItems,
} from "../engines";

import {
  getPriorities,
  getExecutionItems,
  getAssessmentsByLocationIds,
  getRecommendationsByPriorityIds,
  getMemorySnapshotsByLocation,
} from "../repositories";

export function getScopedWorkspaceData(requestContext) {
  requireActiveMembership(requestContext);

  const { membership } = requestContext;

  const scope = {
    level: membership.scopeLevel,
    id: membership.scopeEntityId,
  };

  const organization = expandScope({
    organizationId: membership.organizationId,
    scope,
  });

  const locationIds = getScopedLocationIds(organization);

  
  const organizationPriorities = getPriorities({
    organizationId: membership.organizationId,
  });

  const organizationExecutionItems = getExecutionItems({
    organizationId: membership.organizationId,
  });

  const priorities = getScopedPriorities(
    organizationPriorities,
    locationIds,
  );
  
  const assessments = getAssessmentsByLocationIds({
    organizationId: membership.organizationId,
    locationIds,
  });

  const recommendations = getRecommendationsByPriorityIds({
    organizationId: membership.organizationId,
    priorityIds: priorities.map( (priority) => priority.id,
    ),
  });

  const operationalMemory =
    locationIds.reduce(
      ( memoryByLocation, locationId, ) => {
        const memory =
          getMemorySnapshotsByLocation({
            organizationId:
              membership.organizationId,

            locationId,
          });

        if (memory) {
          memoryByLocation[ locationId ] = memory;
        }

        return memoryByLocation;
      },
      {},
    );

  return {
    organizationId: membership.organizationId,
    organization,
    scope,
    locationIds,

    priorities,
    assessments,
    recommendations,

    executionItems: getScopedExecutionItems(
      organizationExecutionItems,
      locationIds,
    ),

    operationalMemory,
  };
}

function requireActiveMembership(requestContext) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership.status !== "active"
  ) {
    throw new Error(
      "Scoped workspace data requires an active organization membership.",
    );
  }
}