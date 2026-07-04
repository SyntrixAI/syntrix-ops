import { locations } from "./locations";
import { locationHealth } from "./locationHealth";
import { signals } from "./signals";
import { priorities } from "./priorities";
import { memorySnapshots } from "./memorySnapshots";
import { generateOperationalMemory } from "../lib/engines";

export const operationalMemory = generateOperationalMemory({
  locations,
  locationHealth,
  signals,
  priorities,
  memorySnapshots,
});