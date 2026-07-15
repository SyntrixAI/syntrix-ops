import { priorities } from "./priorities";
import { contextFactors } from "./contextFactors";
import { generateContextInsights } from "../lib/engines/contextEngine";

export const contextInsights = generateContextInsights(
  priorities,
  contextFactors
);