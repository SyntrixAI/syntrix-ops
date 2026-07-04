import { intelligenceBrief } from "./intelligenceBrief";
import { priorities } from "./priorities";
import { generateDailyBrief } from "../lib/briefingEngine";

export const dailyBrief = generateDailyBrief(intelligenceBrief, priorities);