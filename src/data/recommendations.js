import { priorities } from "./priorities";
import { generateRecommendations } from "../lib/engines";

export const recommendations = generateRecommendations(priorities);