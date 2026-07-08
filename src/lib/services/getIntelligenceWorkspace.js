import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
import { buildRecommendationContext, buildExecutiveBrief } from "../intelligence";

export function getIntelligenceWorkspace(user) {
  const scoped = getScopedWorkspaceData(user);

  const intelligenceItems = [...scoped.priorities]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map(buildRecommendationContext)
    .filter(Boolean);

  const executiveBrief = buildExecutiveBrief({
    intelligenceItems,
    scopedPriorities: scoped.priorities,
    scopedExecutionItems: scoped.executionItems,
  });

  const topItem = intelligenceItems[0];

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
      items: intelligenceItems,
      topOpportunities: intelligenceItems.slice(0, 5),
    },
  };
}