import { rawEvents } from "../../../data/rawEvents";
import {
  memorySnapshots,
} from "../../../data/memorySnapshots";
import {
  buildDecisionPipeline,
} from "../../pipelines";

function getDecisionPipeline() {
  return buildDecisionPipeline({
    rawEvents,
    memorySnapshots,
  });
}

export function getSignalRecords() {
  return getDecisionPipeline().signals;
}

export function getPriorityRecords() {
  return getDecisionPipeline().priorities;
}

export function getAssessmentRecords() {
  return getDecisionPipeline().assessments;
}

export function getRecommendationRecords() {
  return getDecisionPipeline().recommendations;
}

export function getExecutionItemRecords() {
  return getDecisionPipeline().executionItems;
}