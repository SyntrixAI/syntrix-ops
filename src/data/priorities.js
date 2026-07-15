import { signals } from "./signals";
import { memorySnapshots } from "./memorySnapshots";
import { prioritizeSignals } from "../lib/engines/decisionEngine";

export const priorities = prioritizeSignals(
  signals,
  memorySnapshots,
);