import {
  createExecutiveDecision,
} from "../models";

export function buildExecutiveDecision({
  priority,
 portfolioDecision = null,
  assessments = [],
  recommendations = [],
  executionItems = [],
  operationalMemory = {},
}) {
  if (!priority) {
    return null;
  }

  const assessment =
    findAssessment(
      assessments,
      priority,
    );

  const recommendation =
    findRecommendation(
      recommendations,
      priority,
    );

  const executionItem =
    findExecutionItem(
      executionItems,
      priority,
    );

  const memory =
    findOperationalMemory(
      operationalMemory,
      priority.locationId,
    );

  return createExecutiveDecision({
    priority,
    assessment,
    recommendation,
    executionItem,
    portfolioDecision,
    evidence:
      assessment?.evidence ??
      [],

    rootCauses:
      assessment?.rootCauses ??
      [],

    trends:
      assessment?.trends ??
      [],

    memory,
  });
}

function findAssessment(
  assessments,
  priority,
) {
  return normalizeCollection(
    assessments,
  ).find(
    (assessment) =>
      assessment.priorityId ===
        priority.id ||
      assessment.locationId ===
        priority.locationId,
  );
}

function findRecommendation(
  recommendations,
  priority,
) {
  return normalizeCollection(
    recommendations,
  ).find(
    (recommendation) =>
      recommendation.priorityId ===
      priority.id,
  );
}

function findExecutionItem(
  executionItems,
  priority,
) {
  return normalizeCollection(
    executionItems,
  ).find(
    (item) =>
      item.priorityId ===
        priority.id ||
      item.locationId ===
        priority.locationId,
  );
}

function findOperationalMemory(
  operationalMemory,
  locationId,
) {
  if (
    Array.isArray(
      operationalMemory,
    )
  ) {
    return operationalMemory.find(
      (memory) =>
        memory.locationId ===
        locationId,
    );
  }

  return (
    operationalMemory[
      locationId
    ] ?? null
  );
}

function normalizeCollection(
  collection,
) {
  if (
    Array.isArray(
      collection,
    )
  ) {
    return collection;
  }

  if (
    collection &&
    typeof collection ===
      "object"
  ) {
    return Object.values(
      collection,
    );
  }

  return [];
}