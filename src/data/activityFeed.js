import { signals } from "./signals";
import { assessments } from "./assessments";
import { priorities } from "./priorities";
import { executionItems } from "./executionItems";
import { generateActivityFeed } from "../lib/engines";

export const activityFeed = generateActivityFeed({
  signals,
  assessments,
  priorities,
  executionItems,
});