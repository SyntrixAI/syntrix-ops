import {
  createExecutionPlaybook,
} from "../models";

export function generateExecutionItems(
  priorities,
  recommendations = {},
) {
  if (!Array.isArray(priorities)) {
    throw new Error(
      "Execution Engine requires priorities to be an array.",
    );
  }

  return priorities.map((priority) => {
    const recommendation =
      recommendations[priority.id] ??
      null;

    const confidence =
      priority.confidence ??
      getDefaultConfidence(priority);

    const weeklyRecovery =
      recommendation
        ?.expectedImpact
        ?.weeklyRecovery ??
      priority.estimatedImpact ??
      0;

    return createExecutionPlaybook({
      id: `exec-${priority.id}`,

      organizationId:
        priority.organizationId ??
        null,

      priorityId:
        priority.id,

      locationId:
        priority.locationId ??
        null,

      location:
        priority.location ??
        null,

      title:
        recommendation?.title ??
        priority.primaryAction ??
        priority.title,

      action:
        recommendation?.action ??
        priority.primaryAction ??
        priority.title,

      sourceAssessment:
        priority.title ??
        null,

      description:
        recommendation?.action ??
        priority.title ??
        null,

      businessImpact: {
        weeklyRecovery,

        annualRecovery:
          recommendation
            ?.expectedImpact
            ?.annualRecovery ??
          weeklyRecovery * 52,
      },

      confidence,

      whyNow:
        recommendation?.reasoning ??
        getWhyNow(priority),

      rootCauses:
        recommendation?.rootCauses ??
        [],

      trends:
        recommendation?.trends ??
        [],

      effort:
        recommendation?.effort ??
        priority.effort ??
        "Medium",

      estimatedTime:
        recommendation?.estimatedTime ??
        priority.estimatedTime ??
        null,

      dependencies:
        recommendation?.dependencies ??
        [],

      risk:
        recommendation?.risk ??
        null,

      successCriteria:
        recommendation?.successCriteria ??
        [],

      followUp:
        recommendation?.followUp ??
        null,

      steps:
        recommendation?.steps ??
        [],

      owner:
        priority.owner ??
        getDefaultOwner(priority),

      status:
        priority.executionStatus ??
        getExecutionStatus(priority),

      createdAt:
        priority.createdAt ??
        priority.detectedAt ??
        null,

      completedAt:
        priority.completedAt ??
        null,
    });
  });
}

function getDefaultConfidence(priority) {
  const severity =
    normalizeText(priority?.severity);

  if (severity === "critical") {
    return 94;
  }

  if (severity === "warning") {
    return 88;
  }

  return 82;
}

function getWhyNow(priority) {
  const severity =
    normalizeText(priority?.severity);

  if (severity === "critical") {
    return (
      "High-severity issue with " +
      "immediate business impact."
    );
  }

  if (severity === "warning") {
    return (
      "Operational variance is large " +
      "enough to require investigation."
    );
  }

  return (
    "Low-risk signal worth monitoring " +
    "for pattern development."
  );
}

function getDefaultOwner(priority) {
  const severity =
    normalizeText(priority?.severity);

  if (severity === "critical") {
    return "District Manager";
  }

  if (severity === "warning") {
    return "General Manager";
  }

  return "Operations Lead";
}

function getExecutionStatus(priority) {
  const priorityStatus =
    normalizeText(priority?.status);

  if (priorityStatus === "monitoring") {
    return "Monitoring";
  }

  if (priorityStatus === "resolved") {
    return "Completed";
  }

  return "Recommended";
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}