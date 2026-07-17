import { generateSignals } from "../engines/signalEngine";
import { prioritizeSignals } from "../engines/decisionEngine";
import { generateAssessments } from "../engines/assessmentEngine";
import { generateRecommendations } from "../engines/recommendationEngine";
import { generateExecutionItems } from "../engines/executionEngine";

export function buildDecisionPipeline({
  rawEvents = [],
  memorySnapshots = {},
} = {}) {
  const signals = generateSignals(rawEvents);

  const priorities = prioritizeSignals(
    signals,
    memorySnapshots,
  );

  const assessments =
    generateAssessments(priorities);

  const recommendations =
    generateRecommendations(priorities);

  const executionItems =
    generateExecutionItems(
      priorities,
      recommendations,
    );

  return {
    signals,
    priorities,
    assessments,
    recommendations,
    executionItems,
  };
}