import { recommendations } from "../../data/recommendations";

export function buildRecommendationContext(
  priority,
  {
    memory = null,
  } = {},
) {
  if (!priority) {
    return null;
  }

  const recommendation =
    recommendations[priority.id];

  return {
    priority,
    recommendation,
    rootCauses:
      recommendation?.rootCauses ?? [],
    trends:
      recommendation?.trends ?? [],
    memory,
    memorySummary:
      memory?.summary ??
      "No historical operational memory available yet.",
  };
}