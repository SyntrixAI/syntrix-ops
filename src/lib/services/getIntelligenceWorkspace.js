import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
import {
  buildRecommendationContext,
  buildExecutiveBrief,
  buildOpportunityRanking,
  buildExecutiveDecision,
} from "../intelligence";

export function getIntelligenceWorkspace(user) {
  const scoped = getScopedWorkspaceData(user);

  const intelligenceItems = scoped.priorities
    .map(buildRecommendationContext)
    .filter(Boolean);

  const rankedItems = buildOpportunityRanking(intelligenceItems);

  const decisionItems = rankedItems.map((item) => ({
    ...item,
    executiveDecision: buildExecutiveDecision(item),
  }));

  const executiveBrief = buildExecutiveBrief({
    intelligenceItems,
    scopedPriorities: scoped.priorities,
    scopedExecutionItems: scoped.executionItems,
  });

  const topItem = decisionItems[0];

  return {
    user,
    scope: scoped.organization,

    summary: {
      title: "Syntrix Intelligence",
      description:
        "Executive reasoning generated from priorities, recommendations, root causes, trends, and operational memory.",
      topInsight: topItem,
    },

    executiveBrief,

    intelligence: {
      items: decisionItems,
      topOpportunities: decisionItems.slice(0, 5),
    },
  };
}