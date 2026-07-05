import { generateInsights } from "./insightsEngine";

const severityScore = {
  critical: 35,
  warning: 22,
  info: 10,
};

const effortAdjustment = {
  Low: 10,
  Medium: 5,
  High: -5,
};

const trendAdjustment = {
  Declining: 12,
  Stable: 3,
  Improving: -5,
  Unknown: 0,
};

export function prioritizeSignals(signals, operationalMemory = {}) {
  return [...signals]
    .filter((signal) => signal.status !== "resolved")
    .map((signal) => {
      const memory = getMemoryTrend(signal, operationalMemory);
      const insights = generateInsights(signal, memory);

      return {
        ...signal,
        priorityScore: calculatePriorityScore(signal, memory),
        primaryAction: getPrimaryAction(signal),
        scoreDrivers: getScoreDrivers(signal, memory),
        rationale: buildDecisionRationale(signal, memory),
        insights,
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map((priority, index) => ({
      ...priority,
      priorityRank: index + 1,
    }));
}

function getMemoryTrend(signal, memorySnapshots) {
  const snapshot = memorySnapshots[signal.locationId];

  if (!snapshot) {
    return {
      trend: "Unknown",
    };
  }

  const healthChange =
    snapshot.yesterday.operationalHealth -
    snapshot.lastWeek.operationalHealth;

  return {
    trend:
      healthChange < -3
        ? "Declining"
        : healthChange > 3
          ? "Improving"
          : "Stable",
  };
}

function calculatePriorityScore(signal, memory) {
  const severity = severityScore[signal.severity] ?? 0;

  const impact = Math.min(Math.floor((signal.estimatedImpact ?? 0) / 100), 25);

  const confidence = Math.min(
    Math.floor((signal.confidence ?? 90) / 10),
    10
  );

  const effort = effortAdjustment[signal.effort] ?? 0;

  const trend = trendAdjustment[memory?.trend ?? "Unknown"] ?? 0;

  const score = severity + impact + confidence + effort + trend;

  return Math.max(0, Math.min(100, score));
}

function getPrimaryAction(signal) {
  if (signal.severity === "critical") return "Review immediately";
  if (signal.severity === "warning") return "Investigate";
  return "Monitor";
}

function getScoreDrivers(signal, memory) {
  return [
    {
      label: "Severity",
      value: signal.severity,
    },
    {
      label: "Estimated Impact",
      value: `$${(signal.estimatedImpact ?? 0).toLocaleString()}/wk`,
    },
    {
      label: "Confidence",
      value: `${signal.confidence ?? 90}%`,
    },
    {
      label: "Effort",
      value: signal.effort ?? "Medium",
    },
    {
      label: "Trend",
      value: memory?.trend ?? "Unknown",
    },
  ];
}

function buildDecisionRationale(signal, memory) {
  return {
    headline:
      "This recommendation provides the strongest operational improvement currently available.",

    reasons: [
      `${signal.severity} severity signal detected.`,
      `Estimated weekly impact of $${(
        signal.estimatedImpact ?? 0
      ).toLocaleString()}.`,
      `Confidence is ${signal.confidence ?? 90}%.`,
      `Estimated effort: ${signal.effort ?? "Medium"}.`,
      `Operational trend: ${memory?.trend ?? "Unknown"}.`,
    ],
  };
}