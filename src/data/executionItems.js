import { priorities } from "./priorities";
import { generateExecutionItems } from "../lib/executionEngine";

export const executionItems = generateExecutionItems(priorities);