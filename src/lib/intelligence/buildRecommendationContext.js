import { recommendations } from "../../data/recommendations";
import { getOperationalMemory } from "../services";

export function buildRecommendationContext(priority) {
  if (!priority) return null;

  const recommendation = recommendations[priority.id];

  const memory = getOperationalMemory({
    locationId: priority.locationId,
    category: priority.category,
  });

  return {
    priority,
    recommendation,
    rootCauses: recommendation?.rootCauses ?? [],
    trends: recommendation?.trends ?? [],
    memory,
    memorySummary: getMemorySummary(memory),
  };
}

function getMemorySummary(memory = []) {
  if (!memory.length) {
    return "No similar historical intervention found yet.";
  }

  const bestMatch = memory[0];

  const recovery = bestMatch.outcome?.weeklyRecovery;

  const recoveryText = recovery
    ? ` recovering $${recovery.toLocaleString()}/week`
    : "";

  return `A similar issue previously ${
    bestMatch.outcome?.status?.toLowerCase() ?? "improved"
  } after: ${bestMatch.previousRecommendation}${recoveryText}.`;
}