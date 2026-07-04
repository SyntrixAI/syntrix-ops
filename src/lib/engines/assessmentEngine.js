export function generateAssessments(priorities) {
  return priorities.reduce((assessmentsByLocation, priority) => {
    assessmentsByLocation[priority.locationId] = {
      id: priority.locationId,

      priorityId: priority.id,
      status: getAssessmentStatus(priority.status),
      priority: getPriorityLabel(priority.severity),

      title: getAssessmentTitle(priority),

      assessment: generateAssessmentNarrative(priority),

      recommendation: {
        title: priority.primaryAction,
        description: generateRecommendationDescription(priority),
        effort: priority.effort ?? "Medium",
        estimatedTime: priority.estimatedTime ?? "30–45 min",
        expectedImpact: generateExpectedImpact(priority),
      },

      businessImpact: {
        weeklyRecovery: priority.estimatedImpact ?? 0,
        annualRecovery: (priority.estimatedImpact ?? 0) * 52,
      },

      confidence: priority.confidence ?? getDefaultConfidence(priority),

      evidence: generateEvidence(priority),

      metrics: generateMetrics(priority),

      timeline: generateTimeline(priority),
    };

    return assessmentsByLocation;
  }, {});
}

function getAssessmentStatus(status) {
  if (status === "monitoring") return "Monitoring";
  if (status === "resolved") return "Resolved";
  return "Open";
}

function getPriorityLabel(severity) {
  if (severity === "critical") return "Critical";
  if (severity === "warning") return "High";
  if (severity === "info") return "Medium";

  return "Low";
}

function getAssessmentTitle(priority) {
  if (priority.category === "Labor") return "Labor Efficiency Risk";
  if (priority.category === "Inventory") return "Inventory Variance Risk";
  if (priority.category === "Sales") return "Sales Recovery Signal";

  return `${priority.category} Assessment`;
}

function generateAssessmentNarrative(priority) {
  return `${priority.location} triggered a ${priority.severity} ${priority.category.toLowerCase()} signal. ${priority.description} Syntrix estimates this represents approximately $${(priority.estimatedImpact ?? 0).toLocaleString()} in weekly business impact and recommends: ${priority.primaryAction}.`;
}

function generateRecommendationDescription(priority) {
  if (priority.severity === "critical") {
    return `Review the issue immediately, confirm the underlying data, and take action within ${priority.estimatedTime ?? "30–45 min"}.`;
  }

  if (priority.severity === "warning") {
    return `Investigate the variance, compare it against recent operating patterns, and confirm whether corrective action is needed.`;
  }

  return `Continue monitoring this signal and watch for repeat patterns before escalating.`;
}

function generateExpectedImpact(priority) {
  if (priority.category === "Labor") {
    return {
      labor: "-2.1%",
      primeCost: "-1.8%",
    };
  }

  if (priority.category === "Inventory") {
    return {
      foodCost: "-1.4%",
      primeCost: "-1.1%",
    };
  }

  if (priority.category === "Sales") {
    return {
      sales: "+1.6%",
      guestTraffic: "+1.2%",
    };
  }

  return {
    profit: `+$${priority.estimatedImpact ?? 0}/wk`,
  };
}

function getDefaultConfidence(priority) {
  if (priority.severity === "critical") return 94;
  if (priority.severity === "warning") return 88;
  return 82;
}

function generateEvidence(priority) {
  const baseEvidence = [priority.source, "Recent operating trend", "Location-level performance"];

  if (priority.category === "Labor") {
    return [...baseEvidence, "Labor scheduling", "Sales forecast variance"];
  }

  if (priority.category === "Inventory") {
    return [...baseEvidence, "Inventory variance", "Product usage trend"];
  }

  if (priority.category === "Sales") {
    return [...baseEvidence, "Sales forecast", "Promotion performance"];
  }

  return baseEvidence;
}

function generateMetrics(priority) {
  if (priority.category === "Labor") {
    return {
      salesVsForecast: -8.7,
      labor: 35.2,
      foodCost: 36.7,
      primeCost: 71.9,
    };
  }

  if (priority.category === "Inventory") {
    return {
      salesVsForecast: -2.1,
      labor: 31.4,
      foodCost: 37.9,
      primeCost: 69.3,
    };
  }

  if (priority.category === "Sales") {
    return {
      salesVsForecast: 3.4,
      labor: 29.8,
      foodCost: 33.2,
      primeCost: 63.0,
    };
  }

  return {
    salesVsForecast: 0,
    labor: 0,
    foodCost: 0,
    primeCost: 0,
  };
}

function generateTimeline(priority) {
  return [
    {
      time: priority.detectedAt,
      event: priority.title,
    },
    {
      time: "Now",
      event: `${priority.primaryAction} recommended`,
    },
  ];
}