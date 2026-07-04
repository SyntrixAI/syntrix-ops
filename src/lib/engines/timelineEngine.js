export function generateLiveTimeline(signals) {
  return signals.map((signal) => ({
    id: `timeline-${signal.id}`,

    signalId: signal.id,

    time: signal.detectedAt,
    locationId: signal.locationId,
    location: signal.location,

    category: signal.category,
    severity: signal.severity,

    title: signal.title,
    description: signal.description,

    source: signal.source,
    status: signal.status,

    estimatedImpact: signal.estimatedImpact ?? 0,
  }));
}