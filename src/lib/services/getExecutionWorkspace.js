import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

const PIPELINE_STAGES = [
  {
    label: "Recommended",
    statuses: ["Recommended"],
  },
  {
    label: "Approved",
    statuses: ["Approved"],
  },
  {
    label: "In Progress",
    statuses: ["In Progress"],
  },
  {
    label: "Verified",
    statuses: ["Verified", "Completed"],
  },
];

export function getExecutionWorkspace(requestContext) {
  const scoped = getScopedWorkspaceData(requestContext);
  const executionItems = scoped.executionItems;

  const readyItems = executionItems.filter(
    (item) => item.status === "Recommended",
  );

  const inProgressItems = executionItems.filter(
    (item) => item.status === "In Progress",
  );

  const completedItems = executionItems.filter(
    (item) =>
      item.status === "Completed" ||
      item.status === "Verified",
  );

  const blockedItems = executionItems.filter(
    (item) => item.status === "Blocked",
  );

  const estimatedRecovery = getWeeklyRecovery(
    executionItems,
  );

  const pipeline = PIPELINE_STAGES.map((stage) => {
    const stageItems = executionItems.filter((item) =>
      stage.statuses.includes(item.status),
    );

    return {
      label: stage.label,
      weeklyValue: getWeeklyRecovery(stageItems),
      count: stageItems.length,
    };
  });

  return {
    user: requestContext.user,
    membership: requestContext.membership,
    scope: scoped.organization,

    metrics: {
      totalExecutionItems: executionItems.length,
      readyItems: readyItems.length,
      inProgressItems: inProgressItems.length,
      blockedItems: blockedItems.length,
      completedItems: completedItems.length,
      estimatedRecovery,
    },

    execution: {
      items: executionItems,
      readyItems,
      inProgressItems,
      blockedItems,
      completedItems,
      pipeline,
    },
  };
}

function getWeeklyRecovery(items) {
  return items.reduce(
    (sum, item) =>
      sum +
      (item.businessImpact?.weeklyRecovery ?? 0),
    0,
  );
}