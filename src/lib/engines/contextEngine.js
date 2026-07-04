export function generateContextInsights(priorities, contextFactors = {}) {
  return priorities.reduce((insightsByPriority, priority) => {
    const factors = contextFactors[priority.locationId];

    insightsByPriority[priority.id] = {
      priorityId: priority.id,
      locationId: priority.locationId,
      location: priority.location,

      headline: generateHeadline(priority, factors),
      explanation: generateExplanation(priority, factors),

      factors: factors
        ? [
            { label: "Weather", value: factors.weather },
            { label: "Local Events", value: factors.localEvents },
            { label: "Promotions", value: factors.promotions },
            { label: "Seasonality", value: factors.seasonality },
            { label: "Staffing Pattern", value: factors.staffingPattern },
            { label: "Delivery Notes", value: factors.deliveryNotes },
          ]
        : [],

      confidence: priority.confidence ?? 90,
    };

    return insightsByPriority;
  }, {});
}

function generateHeadline(priority, factors) {
  if (!factors) return "No additional context available";

  if (priority.category === "Labor") {
    return "Labor variance may be demand-driven";
  }

  if (priority.category === "Inventory") {
    return "Inventory variance may be supply or usage driven";
  }

  if (priority.category === "Sales") {
    return "Sales movement may be promotion-driven";
  }

  return "Context factors detected";
}

function generateExplanation(priority, factors) {
  if (!factors) {
    return "Syntrix has not detected enough external context to explain this signal yet.";
  }

  return `${priority.location} triggered a ${priority.category.toLowerCase()} signal. ${factors.weather} ${factors.seasonality} ${factors.staffingPattern}`;
}