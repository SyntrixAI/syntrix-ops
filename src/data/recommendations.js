import { priorities } from "./priorities";
import { generateRecommendations } from "../lib/engines/recommendationEngine";

export const recommendations =
  generateRecommendations(priorities);