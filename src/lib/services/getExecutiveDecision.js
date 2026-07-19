import {
  buildDecisionPortfolio,
} from "../engines";

import {
  buildExecutiveDecision,
} from "./buildExecutiveDecision";

import {
  getScopedWorkspaceData,
} from "./getScopedWorkspaceData";

export function getExecutiveDecision({
  decisionId,
  user,
}) {
  if (!decisionId) {
    return null;
  }

  const priorityId =
    resolvePriorityId(
      decisionId,
    );

  const scoped =
    getScopedWorkspaceData({
      user,
    });

  const priorities =
    normalizeCollection(
      scoped.priorities,
    );

  const priority =
    priorities.find(
      (item) =>
        String(item.id) ===
        String(priorityId),
    );

  if (!priority) {
    return null;
  }

  const assessments =
    normalizeCollection(
      scoped.assessments,
    );

  const recommendations =
    normalizeCollection(
      scoped.recommendations,
    );

  const executionItems =
    normalizeCollection(
      scoped.executionItems,
    );

  const portfolio =
    buildDecisionPortfolio({
      priorities,
      assessments,
      recommendations,
      executionItems,
      operationalMemory:
        scoped.operationalMemory,
    });

  const portfolioDecision =
    findPortfolioDecision(
      portfolio,
      priority.id,
    );

  return buildExecutiveDecision({
    priority,
    portfolioDecision,
    assessments,
    recommendations,
    executionItems,
    operationalMemory:
      scoped.operationalMemory,
  });
}

function resolvePriorityId(
  decisionId,
) {
  return String(decisionId)
    .replace(
      /^decision-/,
      "",
    );
}

function findPortfolioDecision(
  portfolio,
  priorityId,
) {
  const decisions = [
    portfolio?.focus
      ?.primaryDecision,

    ...normalizeCollection(
      portfolio?.focus
        ?.nextDecisions,
    ),

    ...normalizeCollection(
      portfolio?.focus
        ?.deferredDecisions,
    ),
  ].filter(Boolean);

  return (
    decisions.find(
      (decision) =>
        String(
          decision.priorityId,
        ) ===
        String(priorityId),
    ) ?? null
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