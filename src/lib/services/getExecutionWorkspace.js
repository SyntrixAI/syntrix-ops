import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

export function getExecutionWorkspace(user) {
  const scoped = getScopedWorkspaceData(user);

  const executionItems = scoped.executionItems;

  const readyItems = executionItems.filter(
    (item) => item.status === "Recommended",
  );

  const inProgressItems = executionItems.filter(
    (item) => item.status === "In Progress",
  );

  const completedItems = executionItems.filter(
    (item) => item.status === "Completed",
  );

  const blockedItems = executionItems.filter(
    (item) => item.status === "Blocked",
  );

  const estimatedRecovery = executionItems.reduce(
    (sum, item) => sum + (item.businessImpact?.weeklyRecovery ?? 0),
    0,
  );

  return {
    user,
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
    },
  };
}