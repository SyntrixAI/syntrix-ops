import { priorities } from "./priorities";
import { recommendations } from "./recommendations";
import { generateExecutionItems } from "../lib/engines";

export const executionItems = generateExecutionItems(priorities, recommendations);