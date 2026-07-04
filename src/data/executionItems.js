import { priorities } from "./priorities";
import { generateExecutionItems } from "../lib/engines/executionEngine";

export const executionItems = generateExecutionItems(priorities);
