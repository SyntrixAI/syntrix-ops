import { priorities } from "./priorities";
import { recommendations } from "./recommendations";
import { generateExecutionItems } from "../lib/engines/executionEngine";

export const executionItems = generateExecutionItems(
  priorities,
  recommendations,
);