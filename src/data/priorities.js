import { signals } from "./signals";
import { memorySnapshots } from "./memorySnapshots";
import { prioritizeSignals } from "../lib/engines";

export const priorities = prioritizeSignals(signals, memorySnapshots);