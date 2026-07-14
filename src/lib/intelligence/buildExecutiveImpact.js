export function buildExecutiveImpact(item) {
  if (!item) return null;

  const recovery =
    item.priority?.estimatedImpact ?? 0;

  const severity =
    item.priority?.severity ?? "normal";

  return {
    estimatedRecovery: recovery,

    consequence: buildConsequence(
      severity,
      recovery,
    ),

    businessImpact: buildBusinessImpact(
      item,
    ),
  };
}

function buildConsequence(severity, recovery) {
  if (severity === "critical") {
    return `Without action, this issue is likely to continue affecting profitability and operational stability. Approximately $${recovery.toLocaleString()}/week remains at risk.`;
  }

  return `This issue should be addressed before it expands into a larger operational problem.`;
}

function buildBusinessImpact(item) {
  const impacts = [];

  if ((item.priority?.estimatedImpact ?? 0) >= 1000) {
    impacts.push("High financial recovery opportunity");
  }

  if (item.priority?.category === "Labor") {
    impacts.push("Labor efficiency");
  }

  if (item.priority?.category === "Inventory") {
    impacts.push("Food cost");
  }

  if (item.priority?.category === "Sales") {
    impacts.push("Revenue growth");
  }

  return impacts;
}