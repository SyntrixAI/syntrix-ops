export function createPortfolioDecision({
  priority,
  assessment = null,
  recommendation = null,
  executionItem = null,

  confidence = 0,
  portfolioScore = 0,
  classification = "Monitor",
  rationale = null,
  explanation = null,
} = {}) {
  if (!priority?.id) {
    throw new Error(
      "PortfolioDecision requires a priority with an ID.",
    );
  }

  return {
    id: `portfolio-${priority.id}`,

    priorityId: priority.id,
    locationId: priority.locationId ?? null,

    title:
      priority.title ??
      "Untitled decision",

    location:
      priority.location ?? null,

    category:
      priority.category ?? null,

    severity:
      priority.severity ?? "info",

    status:
      priority.status ?? "active",

    priorityScore:
      normalizeNumber(
        priority.priorityScore,
      ),

    portfolioScore:
      normalizeNumber(
        portfolioScore,
      ),

    portfolioRank: null,

    estimatedImpact:
      normalizeNumber(
        priority.estimatedImpact,
      ),

    confidence:
      normalizeNumber(confidence),

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

    recommendation,
    assessment,
    executionItem,

    classification,

    rationale:
      rationale ??
      createEmptyRationale(),

    explanation:
      explanation ??
      createEmptyExplanation(
        portfolioScore,
      ),
  };
}

function createEmptyRationale() {
  return {
    urgency: 0,
    impact: 0,
    confidence: 0,
    executability: 0,
    recurrence: 0,
  };
}

function createEmptyExplanation(
  portfolioScore,
) {
  return {
    headline:
      `Portfolio score: ${
        normalizeNumber(
          portfolioScore,
        )
      }`,

    reasons: [],
  };
}

function normalizeNumber(value) {
  const numericValue =
    Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : 0;
}