import {
  generateActivityFeed,
} from "../engines/activityEngine";

export function getInvestigationActivity({
  priority,
  signal = null,
  assessment = null,
  executionItem = null,
} = {}) {
  if (!priority) {
    return [];
  }

  const activityByInvestigation =
    generateActivityFeed({
      signals: signal ? [signal] : [],
      assessments: assessment
        ? {
            [priority.locationId]: assessment,
          }
        : {},
      priorities: [priority],
      executionItems: executionItem
        ? [executionItem]
        : [],
    });

  return activityByInvestigation[priority.id] ?? [];
}