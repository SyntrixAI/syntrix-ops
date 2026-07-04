export function generateOperationalMemory({
  locations = [],
  locationHealth = {},
  signals = [],
  priorities = [],
  memorySnapshots = {},
}) {
  return locations.reduce((memoryByLocation, location) => {
    const currentHealth = locationHealth[location.id];
    const snapshots = memorySnapshots[location.id];

    const currentSignals = signals.filter(
      (signal) => signal.locationId === location.id
    );

    const currentPriorities = priorities.filter(
      (priority) => priority.locationId === location.id
    );

    memoryByLocation[location.id] = buildLocationMemory({
      location,
      currentHealth,
      currentSignals,
      currentPriorities,
      snapshots,
    });

    return memoryByLocation;
  }, {});
}

function buildLocationMemory({
  location,
  currentHealth,
  currentSignals,
  currentPriorities,
  snapshots,
}) {
  if (!snapshots || !currentHealth) {
    return {
      locationId: location.id,
      status: "No Memory",
      trend: "Unknown",
      summary: "Syntrix does not have enough historical memory for this location yet.",
      changes: [],
    };
  }

  const healthChangeSinceYesterday =
    currentHealth.score - snapshots.yesterday.operationalHealth;

  const healthChangeSinceLastWeek =
    currentHealth.score - snapshots.lastWeek.operationalHealth;

  const signalChangeSinceYesterday =
    currentSignals.length - snapshots.yesterday.activeSignals;

  const priorityChangeSinceYesterday =
    currentPriorities.length - snapshots.yesterday.activePriorities;

  return {
    locationId: location.id,
    status: "Active Memory",
    trend: getTrend(healthChangeSinceLastWeek),
    summary: generateSummary({
      location,
      healthChangeSinceYesterday,
      healthChangeSinceLastWeek,
      signalChangeSinceYesterday,
      priorityChangeSinceYesterday,
    }),
    changes: [
      {
        label: "Health vs Yesterday",
        value: formatSignedNumber(healthChangeSinceYesterday),
      },
      {
        label: "Health vs Last Week",
        value: formatSignedNumber(healthChangeSinceLastWeek),
      },
      {
        label: "Signals vs Yesterday",
        value: formatSignedNumber(signalChangeSinceYesterday),
      },
      {
        label: "Priorities vs Yesterday",
        value: formatSignedNumber(priorityChangeSinceYesterday),
      },
    ],
  };
}

function getTrend(change) {
  if (change > 3) return "Improving";
  if (change < -3) return "Declining";
  return "Stable";
}

function generateSummary({
  location,
  healthChangeSinceYesterday,
  healthChangeSinceLastWeek,
  signalChangeSinceYesterday,
  priorityChangeSinceYesterday,
}) {
  const direction =
    healthChangeSinceLastWeek > 0
      ? "improved"
      : healthChangeSinceLastWeek < 0
        ? "declined"
        : "remained stable";

  return `${location.name} has ${direction} ${Math.abs(
    healthChangeSinceLastWeek
  )} points in Operational Health since last week. Signals changed by ${formatSignedNumber(
    signalChangeSinceYesterday
  )} and priorities changed by ${formatSignedNumber(
    priorityChangeSinceYesterday
  )} since yesterday.`;
}

function formatSignedNumber(value) {
  if (value > 0) return `+${value}`;
  return String(value);
}