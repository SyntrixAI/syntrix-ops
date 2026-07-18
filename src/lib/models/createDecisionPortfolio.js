export function createDecisionPortfolio({
  summary = null,
  focus = null,
  decisions = [],
} = {}) {
  const normalizedDecisions =
    Array.isArray(decisions)
      ? decisions
      : [];

  return {
    summary:
      normalizeSummary(
        summary,
        normalizedDecisions,
      ),

    focus:
      normalizeFocus(
        focus,
        normalizedDecisions,
      ),

    decisions:
      normalizedDecisions,
  };
}

function normalizeSummary(
  summary,
  decisions,
) {
  return {
    activeDecisions:
      normalizeNumber(
        summary?.activeDecisions ??
          decisions.length,
      ),

    criticalDecisions:
      normalizeNumber(
        summary?.criticalDecisions,
      ),

    totalWeeklyImpact:
      normalizeNumber(
        summary?.totalWeeklyImpact,
      ),

    executableWeeklyImpact:
      normalizeNumber(
        summary?.executableWeeklyImpact,
      ),

    averageConfidence:
      normalizeNumber(
        summary?.averageConfidence,
      ),
  };
}

function normalizeFocus(
  focus,
  decisions,
) {
  return {
    primaryDecision:
      focus?.primaryDecision ??
      decisions[0] ??
      null,

    nextDecisions:
      Array.isArray(
        focus?.nextDecisions,
      )
        ? focus.nextDecisions
        : decisions.slice(1, 3),

    deferredDecisions:
      Array.isArray(
        focus?.deferredDecisions,
      )
        ? focus.deferredDecisions
        : [],
  };
}

function normalizeNumber(value) {
  const numericValue =
    Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : 0;
}