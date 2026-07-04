export function generateActivityFeed({
  signals = [],
  assessments = {},
  priorities = [],
  executionItems = [],
}) {
  return priorities.reduce((activityByInvestigation, priority) => {
    const signal = signals.find((signal) => signal.id === priority.id);
    const assessment = assessments[priority.locationId];
    const executionItem = executionItems.find(
      (item) => item.priorityId === priority.id
    );

    activityByInvestigation[priority.id] = [
      signal && {
        id: `activity-${priority.id}-signal`,
        type: "Signal",
        actor: "Signal Engine",
        time: signal.detectedAt,
        title: "Signal detected",
        description: signal.title,
      },
      assessment && {
        id: `activity-${priority.id}-assessment`,
        type: "Assessment",
        actor: "Assessment Engine",
        time: "Now",
        title: "Assessment generated",
        description: assessment.title,
      },
      {
        id: `activity-${priority.id}-priority`,
        type: "Priority",
        actor: "Decision Engine",
        time: "Now",
        title: "Priority created",
        description: `${priority.location} was ranked #${priority.priorityRank} in the operations queue.`,
      },
      executionItem && {
        id: `activity-${priority.id}-execution`,
        type: "Execution",
        actor: "Execution Engine",
        time: "Now",
        title: "Execution item recommended",
        description: executionItem.title,
      },
    ].filter(Boolean);

    return activityByInvestigation;
  }, {});
}