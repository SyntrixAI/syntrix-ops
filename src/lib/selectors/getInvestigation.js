import { priorities } from "../../data/priorities";
import { assessments } from "../../data/assessments";
import { executionItems } from "../../data/executionItems";
import { signals } from "../../data/signals";
import { activityFeed } from "../../data/activityFeed";
import { contextInsights } from "../../data/contextInsights";

export function getInvestigation(id) {
  const priority = priorities.find(
    (priority) => String(priority.id) === String(id)
  );

  if (!priority) return null;

  const assessment = assessments[priority.locationId];

  const executionItem = executionItems.find(
    (item) => item.priorityId === priority.id
  );

  const relatedSignal = signals.find((signal) => signal.id === priority.id);

  return {
    id: priority.id,
    priority,
    assessment,
    executionItem,
    relatedSignal,
    activity: activityFeed[priority.id] || [],
    context: contextInsights[priority.id] || null,
  };
}