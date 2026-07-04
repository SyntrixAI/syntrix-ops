import { locations } from "../../data/locations";
import { signals } from "../../data/signals";
import { priorities } from "../../data/priorities";
import { assessments } from "../../data/assessments";
import { executionItems } from "../../data/executionItems";
import { liveTimeline } from "../../data/liveTimeline";

export function getLocationWorkspace(locationId) {
  const location = locations.find(
    (location) => String(location.id) === String(locationId)
  );

  if (!location) return null;

  const locationSignals = signals.filter(
    (signal) => signal.locationId === location.id
  );

  const locationPriorities = priorities.filter(
    (priority) => priority.locationId === location.id
  );

  const locationExecutionItems = executionItems.filter(
    (item) => item.locationId === location.id
  );

  const locationTimeline = liveTimeline.filter(
    (event) => event.locationId === location.id
  );

  return {
    location,
    signals: locationSignals,
    assessment: assessments[location.id],
    priorities: locationPriorities,
    executionItems: locationExecutionItems,
    timeline: locationTimeline,

    counts: {
      signals: locationSignals.length,
      priorities: locationPriorities.length,
      executionItems: locationExecutionItems.length,
    },
  };
}