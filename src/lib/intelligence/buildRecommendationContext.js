import { recommendations } from "../../data/recommendations";
import { getOperationalMemory } from "../services";

export function buildRecommendationContext(priority) {
  if (!priority) return null;

  const recommendation = recommendations[priority.id];

  const memory = getOperationalMemory(priority.locationId);

  return {
    priority,
    recommendation,
    rootCauses: recommendation?.rootCauses ?? [],
    trends: recommendation?.trends ?? [],
    memory,
  memorySummary:
  memory?.summary ?? "No historical operational memory available yet.",
  };
}