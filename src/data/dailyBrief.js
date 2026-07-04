import { intelligenceBrief } from "./intelligenceBrief";
import { priorities } from "./priorities";
import { generateDailyBrief } from "../lib/engines/briefingEngine";

export const dailyBrief = generateDailyBrief(intelligenceBrief, priorities);
