import { signals } from "../../../data/signals";
import { priorities } from "../../../data/priorities";
import { assessments } from "../../../data/assessments";
import {
  recommendations,
} from "../../../data/recommendations";
import {
  executionItems,
} from "../../../data/executionItems";

export function getSignalRecords() {
  return signals;
}

export function getPriorityRecords() {
  return priorities;
}

export function getAssessmentRecords() {
  return assessments;
}

export function getRecommendationRecords() {
  return recommendations;
}

export function getExecutionItemRecords() {
  return executionItems;
}