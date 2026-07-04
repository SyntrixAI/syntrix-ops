import { priorities } from "./priorities";
import { executionItems } from "./executionItems";
import { generateIntelligenceBrief } from "../lib/intelligenceEngine";

export const intelligenceBrief = generateIntelligenceBrief(
  priorities,
  executionItems
);