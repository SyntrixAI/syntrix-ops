import { priorities } from "./priorities";
import { contextFactors } from "./contextFactors";
import { generateContextInsights } from "../lib/engines";

export const contextInsights = generateContextInsights(
  priorities,
  contextFactors
);