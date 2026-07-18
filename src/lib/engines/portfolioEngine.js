import {
  createDecisionPortfolio,
  createPortfolioDecision,
} from "../models";

const PORTFOLIO_WEIGHTS = {
  urgency: 0.3,
  impact: 0.3,
  confidence: 0.15,
  executability: 0.15,
  recurrence: 0.1,
};

const SEVERITY_SCORES = {
  critical: 100,
  warning: 75,
  info: 40,
};

const EFFORT_SCORES = {
  low: 100,
  medium: 70,
  high: 40,
};

const RECURRENCE_SCORES = {
  declining: 100,
  stable: 65,
  improving: 35,
  unknown: 30,
};

const ACTIVE_EXECUTION_STATUSES = new Set([
  "recommended",
  "ready",
  "in progress",
  "active",
]);

export function buildDecisionPortfolio({
  priorities = [],
  assessments = {},
  recommendations = {},
  executionItems = [],
  operationalMemory = {},
} = {}) {
  if (!Array.isArray(priorities)) {
    throw new Error("Portfolio Engine requires priorities to be an array.");
  }

  const activePriorities = priorities.filter(isActivePriority);

  if (activePriorities.length === 0) {
    return createEmptyPortfolio();
  }

  const maximumImpact = getMaximumImpact(activePriorities);

  const executionItemsByPriority =
    indexExecutionItemsByPriority(executionItems);

  const decisions = activePriorities
    .map((priority) =>
      buildPortfolioDecision({
        priority,
        assessment: assessments[priority.locationId] ?? null,
        recommendation: recommendations[priority.id] ?? null,
        executionItem: executionItemsByPriority[priority.id] ?? null,
        memory: operationalMemory[priority.locationId] ?? null,
        maximumImpact,
      }),
    )
    .sort(comparePortfolioDecisions)
    .map((decision, index) => ({
      ...decision,
      portfolioRank: index + 1,
    }));

  return createDecisionPortfolio({
    summary:
      buildPortfolioSummary(decisions),

    focus:
      buildExecutiveFocus(decisions),

    decisions,
  });
}

export function calculatePortfolioScore({
  priority,
  executionItem = null,
  memory = null,
  maximumImpact = 0,
  confidence = null,
} = {}) {
  if (!priority) {
    return {
      score: 0,

      rationale: {
        urgency: 0,
        impact: 0,
        confidence: 0,
        executability: 0,
        recurrence: 0,
      },
    };
  }

  const rationale = {
    urgency: calculateUrgencyScore(priority),

    impact: calculateImpactScore(priority.estimatedImpact, maximumImpact),

    confidence: normalizeScore(
      confidence ?? priority.confidence ?? getDefaultConfidence(priority),
    ),

    executability: calculateExecutabilityScore({
      priority,
      executionItem,
    }),

    recurrence: calculateRecurrenceScore(memory),
  };

  const weightedScore =
    rationale.urgency * PORTFOLIO_WEIGHTS.urgency +
    rationale.impact * PORTFOLIO_WEIGHTS.impact +
    rationale.confidence * PORTFOLIO_WEIGHTS.confidence +
    rationale.executability * PORTFOLIO_WEIGHTS.executability +
    rationale.recurrence * PORTFOLIO_WEIGHTS.recurrence;

  return {
    score: Math.round(normalizeScore(weightedScore)),

    rationale,
  };
}

export function classifyDecision({
  portfolioScore,
  severity,
  status,
  confidence,
  executionItem,
} = {}) {
  const normalizedSeverity = normalizeText(severity);

  const normalizedStatus = normalizeText(status);

  const normalizedConfidence = normalizeScore(confidence ?? 0);

  const hasExecutableAction = Boolean(executionItem);

  if (normalizedStatus === "monitoring") {
    return "Monitor";
  }

  if (normalizedSeverity === "critical" || portfolioScore >= 80) {
    return "Act Now";
  }

  if (
    portfolioScore >= 60 &&
    hasExecutableAction &&
    normalizedConfidence >= 70
  ) {
    return "Plan Next";
  }

  if (portfolioScore >= 45 || normalizedConfidence < 70) {
    return "Monitor";
  }

  return "Defer";
}

function buildPortfolioDecision({
  priority,
  assessment,
  recommendation,
  executionItem,
  memory,
  maximumImpact,
}) {
  const confidence =
    resolveDecisionConfidence({
      priority,
      assessment,
      executionItem,
    });

  const {
    score,
    rationale,
  } = calculatePortfolioScore({
    priority,
    executionItem,
    memory,
    maximumImpact,
    confidence,
  });

  const classification =
    classifyDecision({
      portfolioScore: score,
      severity: priority.severity,
      status: priority.status,
      confidence,
      executionItem,
    });

  const explanation =
    buildPortfolioExplanation({
      priority,
      score,
      confidence,
      rationale,
      executionItem,
      memory,
    });

  return createPortfolioDecision({
    priority,
    assessment,
    recommendation,
    executionItem,

    confidence,
    portfolioScore: score,
    classification,
    rationale,
    explanation,
  });
}

function buildPortfolioSummary(decisions) {
  const totalConfidence = decisions.reduce(
    (total, decision) => total + decision.confidence,
    0,
  );

  return {
    activeDecisions: decisions.length,

    criticalDecisions: decisions.filter(
      (decision) => decision.severity === "critical",
    ).length,

    totalWeeklyImpact: decisions.reduce(
      (total, decision) => total + decision.estimatedImpact,
      0,
    ),

    executableWeeklyImpact: decisions
      .filter(
        (decision) =>
          decision.executionItem && decision.classification !== "Defer",
      )
      .reduce((total, decision) => total + decision.estimatedImpact, 0),

    averageConfidence:
      decisions.length > 0 ? Math.round(totalConfidence / decisions.length) : 0,
  };
}

function buildExecutiveFocus(decisions) {
  return {
    primaryDecision: decisions[0] ?? null,

    nextDecisions: decisions.slice(1, 3),

    deferredDecisions: decisions.filter(
      (decision) => decision.classification === "Defer",
    ),
  };
}

function calculateUrgencyScore(priority) {
  const severity = normalizeText(priority.severity);

  const severityScore = SEVERITY_SCORES[severity] ?? 30;

  const ageAdjustment = calculateAgeAdjustment(priority.detectedAt);

  return normalizeScore(severityScore + ageAdjustment);
}

function calculateImpactScore(estimatedImpact, maximumImpact) {
  const impact = Number(estimatedImpact) || 0;

  const maximum = Number(maximumImpact) || 0;

  if (impact <= 0 || maximum <= 0) {
    return 0;
  }

  return Math.round(normalizeScore((impact / maximum) * 100));
}

function calculateExecutabilityScore({ priority, executionItem }) {
  const effort = normalizeText(
    executionItem?.effort ?? priority.effort ?? "medium",
  );

  let score = EFFORT_SCORES[effort] ?? EFFORT_SCORES.medium;

  if (!executionItem) {
    score -= 20;
  }

  const executionStatus = normalizeText(executionItem?.status);

  if (ACTIVE_EXECUTION_STATUSES.has(executionStatus)) {
    score += 5;
  }

  return normalizeScore(score);
}

function calculateRecurrenceScore(memory) {
  const trend = normalizeText(memory?.trend);

  return RECURRENCE_SCORES[trend] ?? RECURRENCE_SCORES.unknown;
}

function calculateAgeAdjustment(detectedAt) {
  if (!detectedAt) {
    return 0;
  }

  const detectedTime = Date.parse(detectedAt);

  if (Number.isNaN(detectedTime)) {
    return 0;
  }

  const ageInHours = (Date.now() - detectedTime) / (1000 * 60 * 60);

  if (ageInHours >= 72) {
    return 10;
  }

  if (ageInHours >= 24) {
    return 6;
  }

  if (ageInHours >= 8) {
    return 3;
  }

  return 0;
}

function buildPortfolioExplanation({
  priority,
  score,
  confidence,
  rationale,
  executionItem,
  memory,
}) {
  const reasons = [
    `${formatLabel(priority.severity)} urgency received a component score of ${
      rationale.urgency
    }.`,

    `$${(
      priority.estimatedImpact ?? 0
    ).toLocaleString()} in weekly impact received a component score of ${
      rationale.impact
    }.`,

    `${confidence}% confidence received a component score of ${
      rationale.confidence
    }.`,

    `${formatLabel(
      executionItem?.effort ?? priority.effort ?? "Medium",
    )} execution effort received a component score of ${
      rationale.executability
    }.`,

    `${formatLabel(
      memory?.trend ?? "Unknown",
    )} operating history received a component score of ${
      rationale.recurrence
    }.`,
  ];

  return {
    headline: `Portfolio score: ${score}`,

    reasons,
  };
}

function comparePortfolioDecisions(first, second) {
  if (second.portfolioScore !== first.portfolioScore) {
    return second.portfolioScore - first.portfolioScore;
  }

  if (second.estimatedImpact !== first.estimatedImpact) {
    return second.estimatedImpact - first.estimatedImpact;
  }

  if (second.confidence !== first.confidence) {
    return second.confidence - first.confidence;
  }

  return String(first.id).localeCompare(String(second.id));
}

function indexExecutionItemsByPriority(executionItems) {
  if (!Array.isArray(executionItems)) {
    return {};
  }

  return executionItems.reduce((executionItemsByPriority, executionItem) => {
    if (executionItem?.priorityId) {
      executionItemsByPriority[executionItem.priorityId] = executionItem;
    }

    return executionItemsByPriority;
  }, {});
}

function getMaximumImpact(priorities) {
  return priorities.reduce(
    (maximumImpact, priority) =>
      Math.max(maximumImpact, Number(priority.estimatedImpact) || 0),
    0,
  );
}

function isActivePriority(priority) {
  return priority && normalizeText(priority.status) !== "resolved";
}

function normalizeScore(value) {
  const numericValue = Number(value) || 0;

  return Math.max(0, Math.min(100, numericValue));
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function formatLabel(value) {
  const normalizedValue = String(value ?? "Unknown").trim();

  if (!normalizedValue) {
    return "Unknown";
  }

  return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1);
}

function createEmptyPortfolio() {
  return createDecisionPortfolio();
}

function resolveDecisionConfidence({ priority, assessment, executionItem }) {
  return normalizeScore(
    assessment?.confidence ??
      executionItem?.confidence ??
      priority?.confidence ??
      getDefaultConfidence(priority),
  );
}

function getDefaultConfidence(priority) {
  const severity = normalizeText(priority?.severity);

  if (severity === "critical") {
    return 94;
  }

  if (severity === "warning") {
    return 88;
  }

  return 82;
}
