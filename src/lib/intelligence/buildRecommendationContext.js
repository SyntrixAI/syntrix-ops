export function buildRecommendationContext(
  priority,
  {
    recommendation = null,
    memory = null,
  } = {},
) {
  if (!priority) {
    return null;
  }

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