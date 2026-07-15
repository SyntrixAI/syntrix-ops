import { locations } from "./locations";
import { signals } from "./signals";
import { assessments } from "./assessments";
import { priorities } from "./priorities";
import { executionItems } from "./executionItems";
import { generateLocationHealth } from "../lib/engines/healthEngine";

export const locationHealth = generateLocationHealth({
  locations,
  signals,
  assessments,
  priorities,
  executionItems,
});