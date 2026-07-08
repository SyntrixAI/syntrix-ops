import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
import { buildRecommendationContext } from "../intelligence";

export function getIntelligenceWorkspace(user) {
  const scoped = getScopedWorkspaceData(user);

  const priorities = scoped.priorities;

  const intelligenceItems = priorities.map((priority) =>
    buildRecommendationContext(priority),
  ).filter(Boolean);

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

    intelligence: {
      items: intelligenceItems,
      topOpportunities: intelligenceItems.slice(0, 5),
    },
  };
}