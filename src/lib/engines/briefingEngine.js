export function generateDailyBrief(intelligenceBrief, priorities = []) {
  return {
    generatedAt: intelligenceBrief.generatedAt,

    executiveSummary: {
      yesterday:
        "Syntrix reviewed recent operational signals and identified the highest-impact areas requiring leadership attention.",

      today: intelligenceBrief.summary,

      recommendation: intelligenceBrief.recommendedDecision,

      estimatedRecovery: {
        amount: intelligenceBrief.estimatedImpact ?? 0,
        period: "week",
      },
    },

    priorities: priorities.map((priority) => ({
      id: priority.id,
      priority: getPriorityLabel(priority.severity),
      title: getPriorityTitle(priority),
      reason: priority.description,
      impact: {
        amount: priority.estimatedImpact ?? 0,
        period: "week",
      },
      effort: priority.effort,
      estimatedTime: priority.estimatedTime,
      nextStep: priority.primaryAction,
    })),

    schedule: generateSuggestedSchedule(priorities),
  };
}

function getPriorityLabel(severity) {
  if (severity === "critical") return "Critical";
  if (severity === "warning") return "High";
  if (severity === "info") return "Medium";

  return "Low";
}

function getPriorityTitle(priority) {
  if (priority.primaryAction) {
    return `${priority.primaryAction}: ${priority.location}`;
  }

  return `Review ${priority.location}`;
}

function generateSuggestedSchedule(priorities) {
  const topPriority = priorities[0];
  const secondPriority = priorities[1];

  return [
    {
      time: "9:00 AM",
      task: "Review overnight operational signals",
    },
    {
      time: "10:30 AM",
      task: topPriority
        ? `${topPriority.primaryAction} at ${topPriority.location}`
        : "Continue monitoring all locations",
    },
    {
      time: "1:00 PM",
      task: secondPriority
        ? `${secondPriority.primaryAction} at ${secondPriority.location}`
        : "Review location-level performance",
    },
    {
      time: "4:00 PM",
      task: "Review execution progress and unresolved priorities",
    },
  ];
}