export function generateRootCauses(priority) {
  const causes = [];

  if (priority.category === "Labor") {
    causes.push({
      id: "labor-demand-mismatch",
      title: "Labor demand mismatch",
      description:
        "Scheduled labor appears elevated relative to current sales performance.",
      evidence: [
        "Labor is above target.",
        "Sales are below forecast.",
        "Prime cost pressure is increasing.",
      ],
      confidence: "high",
    });
  }

  if (priority.category === "Inventory") {
    causes.push({
      id: "inventory-variance",
      title: "Inventory variance",
      description:
        "Inventory movement may not be matching receiving, usage, or waste records.",
      evidence: [
        "Inventory variance is above expected range.",
        "Food cost pressure is increasing.",
        "Usage should be reconciled against purchase records.",
      ],
      confidence: "medium",
    });
  }

  if (priority.category === "Sales") {
    causes.push({
      id: "sales-recovery-gap",
      title: "Sales recovery gap",
      description:
        "Sales performance is trailing expected demand or forecast assumptions.",
      evidence: [
        "Sales are below forecast.",
        "Recovery is not matching expected trend.",
        "Operational plans may need to be adjusted to demand.",
      ],
      confidence: "medium",
    });
  }

  if (!causes.length) {
    causes.push({
      id: "operational-variance",
      title: "Operational variance",
      description:
        "Syntrix detected an operational variance that requires manager review.",
      evidence: [
        "Priority score exceeded review threshold.",
        "Operational metrics moved outside expected range.",
      ],
      confidence: "medium",
    });
  }

  return causes;
}