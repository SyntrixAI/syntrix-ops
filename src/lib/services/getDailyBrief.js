import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";
import { locationHealth } from "../../data/locationHealth";

export function getDailyBrief() {
  const topPriority = priorities[0];

  const executiveInsights = priorities
    .flatMap((priority) => priority.insights ?? [])
    .slice(0, 3);

  const criticalInvestigations = priorities.filter(
    (priority) => priority.priorityScore >= 90
  );

  const healthScores = Object.values(locationHealth);

  const averageHealth =
    healthScores.reduce((sum, health) => sum + health.score, 0) /
    healthScores.length;

  return {
    health: {
      score: Math.round(averageHealth),
      status: averageHealth >= 80 ? "Healthy" : "Watch",
    },

    topDecision: topPriority,

    executiveInsights,

    criticalInvestigations,

    executionQueue: executionItems.slice(0, 5),
  };
}