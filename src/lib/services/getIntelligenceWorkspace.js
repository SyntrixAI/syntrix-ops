import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
import { buildRecommendationContext, buildExecutiveBrief } from "../intelligence";

export function getIntelligenceWorkspace(user) {
  const scoped = getScopedWorkspaceData(user);

  const intelligenceItems = scoped.priorities
    .map(buildRecommendationContext)
    .filter(Boolean);

  const rankedItems = buildOpportunityRanking(intelligenceItems);

  const executiveBrief = buildExecutiveBrief({
    intelligenceItems,
    scopedPriorities: scoped.priorities,
    scopedExecutionItems: scoped.executionItems,
  });

  const topItem = rankedItems[0];

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
      items: rankedItems,
      topOpportunities: rankedItems.slice(0, 5),
    },
  };
}