export function generateInsights(priority, memory) {
  const insights = [];

  // Trend

  if (memory?.trend === "Declining") {
    insights.push({
      id: "trend",
      type: "trend",

      title: "Recurring Pattern",

      description:
        "Operational performance continues to decline based on historical memory.",

      importance: "high",
    });
  }

  // Impact

  if ((priority.estimatedImpact ?? 0) >= 1000) {
    insights.push({
      id: "impact",
      type: "impact",

      title: "High Recovery Opportunity",

      description: `Estimated weekly recovery of $${priority.estimatedImpact.toLocaleString()}.`,

      importance: "high",
    });
  }

  // Confidence

  if ((priority.confidence ?? 90) >= 90) {
    insights.push({
      id: "confidence",
      type: "confidence",

      title: "High Confidence",

      description:
        "Historical operational patterns strongly support this recommendation.",

      importance: "medium",
    });
  }

  return insights;
}