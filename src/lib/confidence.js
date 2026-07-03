export function getConfidenceLevel(score) {
  if (score >= 95) {
    return {
      level: "High",
      tone: "success",
      description: "Based on strong operational evidence.",
    };
  }

  if (score >= 80) {
    return {
      level: "Medium",
      tone: "warning",
      description: "Supported by multiple operational signals.",
    };
  }

  return {
    level: "Low",
    tone: "danger",
    description: "Limited evidence. Review supporting data.",
  };
}