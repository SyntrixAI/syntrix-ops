import { rawEvents } from "../../../data/rawEvents";
import {
  memorySnapshots,
} from "../../../data/memorySnapshots";
import {
  buildDecisionPipeline,
} from "../../pipelines";

const decisionPipeline = buildDecisionPipeline({
  rawEvents,
  memorySnapshots,
});

export function getSignalRecords() {
  return decisionPipeline.signals;
}

export function getPriorityRecords() {
  return decisionPipeline.priorities;
}

export function getAssessmentRecords() {
  return decisionPipeline.assessments;
}

export function getRecommendationRecords() {
  return decisionPipeline.recommendations;
}

export function getExecutionItemRecords() {
  return decisionPipeline.executionItems;
}