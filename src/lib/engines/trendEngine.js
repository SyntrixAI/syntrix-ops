export function generateTrends(priority) {
  const trends = [];

  if (priority.status === "monitoring") {
    trends.push({
      id: "monitoring-pattern",
      title: "Monitoring Pattern",
      direction: "watching",
      description:
        "This issue is being monitored for repeat movement before escalation.",
      severity: "medium",
    });
  }

  if (priority.severity === "critical") {
    trends.push({
      id: "critical-escalation",
      title: "Critical Escalation",
      direction: "worsening",
      description:
        "This issue has crossed the threshold for immediate leadership attention.",
      severity: "high",
    });
  }

  if ((priority.priorityScore ?? 0) >= 90) {
    trends.push({
      id: "high-priority-score",
      title: "High Priority Score",
      direction: "worsening",
      description:
        "The priority score indicates this issue is materially affecting operations.",
      severity: "high",
    });
  }

  if ((priority.estimatedImpact ?? 0) >= 1000) {
    trends.push({
      id: "large-recovery-opportunity",
      title: "Large Recovery Opportunity",
      direction: "opportunity",
      description:
        "The estimated recovery opportunity is large enough to justify immediate action.",
      severity: "high",
    });
  }

  if (!trends.length) {
    trends.push({
      id: "stable-watch",
      title: "Stable Watch",
      direction: "stable",
      description:
        "No major worsening pattern detected. Continue monitoring for repeat signals.",
      severity: "low",
    });
  }

  return trends;
}