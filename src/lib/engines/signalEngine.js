export function generateSignals(rawEvents) {
  return rawEvents.map((event) => ({
    id: event.id,

    severity: event.severity ?? "info",
    category: event.category,
    source: event.source,

    locationId: event.locationId,
    location: event.location,

    title: event.title,
    description: event.description,

    detectedAt: event.detectedAt,

    estimatedImpact: event.estimatedImpact ?? 0,
    effort: event.effort ?? "Medium",
    estimatedTime: event.estimatedTime ?? "30–45 min",

    status: event.status ?? "active",
  }));
}