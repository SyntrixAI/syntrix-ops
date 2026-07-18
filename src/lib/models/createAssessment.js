export function createAssessment({
  id,
  organizationId = null,
  priorityId,
  locationId,
  location = null,

  status = "Open",
  priority = "Low",

  title,
  assessment = null,

  recommendation = null,
  businessImpact = null,

  confidence = 0,

  evidence = [],
  metrics = {},
  timeline = [],

  createdAt = null,
  updatedAt = null,
} = {}) {
  if (!priorityId) {
    throw new Error(
      "Assessment requires a priority ID.",
    );
  }

  if (!locationId) {
    throw new Error(
      "Assessment requires a location ID.",
    );
  }

  return {
    id:
      id ??
      `assessment-${priorityId}`,

    organizationId,
    priorityId,
    locationId,
    location,

    status:
      normalizeLabel(
        status,
        "Open",
      ),

    priority:
      normalizeLabel(
        priority,
        "Low",
      ),

    title:
      title ??
      "Operational Assessment",

    assessment:
      assessment ?? null,

    recommendation:
      normalizeRecommendation(
        recommendation,
      ),

    businessImpact:
      normalizeBusinessImpact(
        businessImpact,
      ),

    confidence:
      normalizeScore(confidence),

    evidence:
      normalizeArray(evidence),

    metrics:
      normalizeMetrics(metrics),

    timeline:
      normalizeArray(timeline),

    createdAt:
      createdAt ?? null,

    updatedAt:
      updatedAt ?? null,
  };
}

function normalizeRecommendation(
  recommendation,
) {
  if (!recommendation) {
    return {
      title: null,
      description: null,
      effort: "Medium",
      estimatedTime: null,
      expectedImpact: {},
    };
  }

  return {
    title:
      recommendation.title ??
      null,

    description:
      recommendation.description ??
      recommendation.action ??
      null,

    effort:
      normalizeLabel(
        recommendation.effort,
        "Medium",
      ),

    estimatedTime:
      recommendation.estimatedTime ??
      null,

    expectedImpact:
      normalizeObject(
        recommendation.expectedImpact,
      ),
  };
}

function normalizeBusinessImpact(
  businessImpact,
) {
  return {
    weeklyRecovery:
      normalizeNumber(
        businessImpact?.weeklyRecovery,
      ),

    annualRecovery:
      normalizeNumber(
        businessImpact?.annualRecovery,
      ),
  };
}

function normalizeMetrics(metrics) {
  const normalizedMetrics =
    normalizeObject(metrics);

  return Object.fromEntries(
    Object.entries(
      normalizedMetrics,
    ).map(([key, value]) => [
      key,
      normalizeNumber(value),
    ]),
  );
}

function normalizeArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}

function normalizeObject(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  )
    ? value
    : {};
}

function normalizeLabel(
  value,
  fallback,
) {
  const normalizedValue =
    String(value ?? "").trim();

  return normalizedValue ||
    fallback;
}

function normalizeScore(value) {
  return Math.max(
    0,
    Math.min(
      100,
      normalizeNumber(value),
    ),
  );
}

function normalizeNumber(value) {
  const numericValue =
    Number(value);

  return Number.isFinite(
    numericValue,
  )
    ? numericValue
    : 0;
}