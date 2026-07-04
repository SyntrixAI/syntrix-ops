import { priorities } from "./priorities";
import { executionItems } from "./executionItems";
import { generateIntelligenceBrief } from "../lib/engines/intelligenceEngine";

export const intelligenceBrief = generateIntelligenceBrief(
  priorities,
  executionItems,
);
