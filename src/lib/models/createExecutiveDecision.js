export function createExecutiveDecision({
  priority,
  assessment = null,
  recommendation = null,
  executionItem = null,
  portfolioDecision = null,
  evidence = [],
  rootCauses = [],
  trends = [],
  memory = null,
} = {}) {
  if (!priority?.id) {
    throw new Error(
      "ExecutiveDecision requires a priority with an ID.",
    );
  }

  return {
    id:
      `decision-${priority.id}`,

    priorityId:
      priority.id,

    locationId:
      priority.locationId ?? null,

    title:
      priority.title ??
      "Untitled decision",

    location:
      priority.location ?? null,

    category:
      priority.category ?? null,

    status:
      resolveDecisionStatus({
        priority,
        executionItem,
      }),

    classification:
      portfolioDecision
        ?.classification ??
      "Monitor",

    portfolio: {
      rank:
        portfolioDecision
          ?.portfolioRank ??
        null,

      score:
        normalizeNumber(
          portfolioDecision
            ?.portfolioScore,
        ),

      rationale:
        portfolioDecision
          ?.rationale ??
        null,

      explanation:
        portfolioDecision
          ?.explanation ??
        null,
    },

    situation: {
      severity:
        priority.severity ??
        "info",

      detectedAt:
        priority.detectedAt ??
        null,

      whyNow:
        priority.whyNow ??
        executionItem?.whyNow ??
        null,

      description:
        priority.description ??
        null,
        
      risk:
        executionItem?.risk ??
        recommendation?.risk ??
        null,
    },

    assessment: {
      summary:
        resolveAssessmentSummary(
          assessment,
        ),

      businessImpact:
        assessment
          ?.businessImpact ??
        null,

      evidence:
        normalizeCollection(
          evidence,
        ),

      rootCauses:
        normalizeCollection(
            firstNonEmptyCollection(
            rootCauses,
            assessment?.rootCauses,
            executionItem?.rootCauses,
            ),
        ),

      trends:
        normalizeCollection(
            firstNonEmptyCollection(
            trends,
            assessment?.trends,
            executionItem?.trends,
            ),
        ),

      memory,
    },

    recommendation: {
      title:
        recommendation?.title ??
        priority.primaryAction ??
        null,

      description:
        recommendation
          ?.description ??
        null,

      rationale:
        recommendation
          ?.rationale ??
        null,

      effort:
        executionItem?.effort ??
        recommendation?.effort ??
        priority.effort ??
        "Medium",

      estimatedTime:
        executionItem
          ?.estimatedTime ??
        recommendation
          ?.estimatedTime ??
        priority.estimatedTime ??
        null,
    },

    impact: {
      weeklyRecovery:
        normalizeNumber(
          assessment
            ?.businessImpact
            ?.weeklyRecovery ??
          priority.estimatedImpact,
        ),

      annualRecovery:
        normalizeNumber(
          assessment
            ?.businessImpact
            ?.annualRecovery,
        ),

      confidence:
        normalizeNumber(
          portfolioDecision
            ?.confidence ??
          assessment?.confidence ??
          priority.confidence,
        ),
    },

    execution: {
      id:
        executionItem?.id ??
        null,

      status:
        executionItem?.status ??
        "Recommended",

      owner:
        executionItem?.owner ??
        "Operations Lead",

      playbook:
        executionItem,

      isExecutable:
        Boolean(
          executionItem,
        ),
    },

    success: {
      expectedOutcome:
        resolveExpectedOutcome({
          assessment,
          recommendation,
          executionItem,
        }),

      measures:
        resolveSuccessMeasures({
          assessment,
          recommendation,
          executionItem,
        }),

      reviewAt:
        executionItem
          ?.reviewAt ??
        null,
    },
  };
}

function resolveDecisionStatus({
  priority,
  executionItem,
}) {
  const executionStatus =
    normalizeText(
      executionItem?.status,
    );

  if (
    executionStatus ===
      "complete" ||
    executionStatus ===
      "completed"
  ) {
    return "Completed";
  }

  if (
    executionStatus ===
      "in progress" ||
    executionStatus ===
      "active"
  ) {
    return "Executing";
  }

  if (executionItem) {
    return "Ready";
  }

  const priorityStatus =
    normalizeText(
      priority?.status,
    );

  if (
    priorityStatus ===
    "monitoring"
  ) {
    return "Monitoring";
  }

  return "Review";
}

function resolveAssessmentSummary(
  assessment,
) {
  return (
    assessment?.summary ??
    assessment?.headline ??
    assessment?.assessment ??
    null
  );
}

function resolveExpectedOutcome({
  assessment,
  recommendation,
  executionItem,
}) {
  return (
    executionItem
      ?.expectedOutcome ??
    recommendation
      ?.expectedOutcome ??
    assessment
      ?.expectedOutcome ??
    executionItem
      ?.followUp ??
    null
  );
}

function resolveSuccessMeasures({
  assessment,
  recommendation,
  executionItem,
}) {
  const measures =
    firstNonEmptyCollection(
      executionItem
        ?.successMeasures,

      executionItem
        ?.successCriteria,

      recommendation
        ?.successMeasures,

      recommendation
        ?.successCriteria,

      assessment
        ?.successMeasures,

      assessment
        ?.successCriteria,
    );

  return normalizeCollection(
    measures,
  );
}

function normalizeCollection(
  value,
) {
  return Array.isArray(value)
    ? value
    : [];
}

function normalizeNumber(
  value,
) {
  const numericValue =
    Number(value);

  return Number.isFinite(
    numericValue,
  )
    ? numericValue
    : 0;
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function firstNonEmptyCollection(
  ...collections
) {
  return (
    collections.find(
      (collection) =>
        Array.isArray(
          collection,
        ) &&
        collection.length > 0,
    ) ?? []
  );
}