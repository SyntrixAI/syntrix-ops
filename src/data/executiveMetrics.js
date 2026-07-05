import { locations } from "./locations";
import { locationHealth } from "./locationHealth";
import { priorities } from "./priorities";
import { executionItems } from "./executionItems";
import { generateExecutiveMetrics } from "../lib/engines";

export const executiveMetrics = generateExecutiveMetrics({
  locations,
  locationHealth,
  priorities,
  executionItems,
});