import { priorities } from "./priorities";
import { generateAssessments } from "../lib/engines";

export const assessments = generateAssessments(priorities);