export function createExecutionPlaybook({
  id,
  organizationId = null,
  priorityId,
  locationId,
  location = null,

  title,
  action = null,
  sourceAssessment = null,
  description = null,

  owner = "Operations Lead",
  status = "Recommended",

  effort = "Medium",
  estimatedTime = null,

  businessImpact = null,
  confidence = 0,

  whyNow = null,
  rootCauses = [],
  trends = [],
  steps = [],

  dependencies = [],
  risk = null,
  successCriteria = [],
  followUp = null,

  createdAt = null,
  completedAt = null,
} = {}) {
  if (!priorityId) {
    throw new Error(
      "ExecutionPlaybook requires a priority ID.",
    );
  }

  return {
    id:
        id ??
        `exec-${priorityId}`,

    organizationId,
    priorityId,
    locationId:
        locationId ?? null,
    location,

    title:
        title ??
        action ??
        "Operational action",

    action:
        action ??
        title ??
        null,

    sourceAssessment,
    description,

    owner:
        owner ??
        "Operations Lead",

    status:
        normalizeStatus(status),

    effort:
        normalizeEffort(effort),

    estimatedTime:
        estimatedTime ?? null,

    businessImpact:
        normalizeBusinessImpact(
        businessImpact,
        ),

    confidence:
        normalizeScore(confidence),

    whyNow,

    rootCauses:
        normalizeArray(rootCauses),

    trends:
        normalizeArray(trends),

    steps:
        normalizeArray(steps),

    dependencies:
        normalizeArray(dependencies),

    risk,

    successCriteria:
        normalizeArray(
        successCriteria,
        ),

    followUp,

    createdAt,
    completedAt,
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

function normalizeStatus(value) {
  const normalizedValue =
    String(
      value ?? "Recommended",
    ).trim();

  return normalizedValue ||
    "Recommended";
}

function normalizeEffort(value) {
  const normalizedValue =
    String(
      value ?? "Medium",
    ).trim();

  return normalizedValue ||
    "Medium";
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

function normalizeArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}