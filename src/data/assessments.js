import { priorities } from "./priorities";
import { generateAssessments } from "../lib/engines/assessmentEngine";

export const assessments = generateAssessments(priorities);