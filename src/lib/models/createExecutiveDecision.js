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
        buildWhyNow({
          priority,
          portfolioDecision,
          executionItem,
        }),

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
        executionItem?.title ??
        priority.primaryAction ??
        null,

      description:
        recommendation?.description ??
        executionItem?.action ??
        executionItem?.description ??
        null,

      rationale:
        recommendation?.rationale ??
        assessment?.summary ??
        null,

      effort:
        executionItem?.effort ??
        recommendation?.effort ??
        priority.effort ??
        "Medium",

      estimatedTime:
        executionItem?.estimatedTime ??
        recommendation?.estimatedTime ??
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
          executionItem?.action ||
          executionItem?.steps?.length,
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

      followUp:
        executionItem?.followUp ??
        null,

      reviewAt:
        executionItem?.reviewAt ??
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
    executionItem?.expectedOutcome ??
    recommendation?.expectedOutcome ??
    assessment?.expectedOutcome ??
    deriveExpectedOutcome(
      executionItem,
    )
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

function buildWhyNow({
  priority,
  portfolioDecision,
  executionItem,
}) {
  const rank =
    portfolioDecision?.portfolioRank ??
    null;

  const score =
    portfolioDecision?.portfolioScore ??
    null;

  const impact =
    priority?.estimatedImpact ??
    executionItem
      ?.businessImpact
      ?.weeklyRecovery ??
    0;

  const effort =
    executionItem?.effort ??
    priority?.effort ??
    null;

  const statements = [];

  if (rank) {
    statements.push(
      `${priority.location ?? "This issue"} is ranked #${rank} in the current decision portfolio.`,
    );
  }

  if (score !== null) {
    statements.push(
      `It has a portfolio score of ${score}.`,
    );
  }

  if (impact > 0) {
    statements.push(
      `Syntrix estimates a weekly recovery opportunity of $${impact.toLocaleString()}.`,
    );
  }

  if (effort) {
    statements.push(
      `The recommended response requires ${String(effort).toLowerCase()} effort.`,
    );
  }

  return (
    statements.join(" ") ||
    priority?.whyNow ||
    executionItem?.whyNow ||
    null
  );
}

function deriveExpectedOutcome(
  executionItem,
) {
  const criteria =
    executionItem?.successCriteria;

  if (
    !Array.isArray(criteria) ||
    criteria.length === 0
  ) {
    return null;
  }

  return criteria.join(" ");
}