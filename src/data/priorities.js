import { signals } from "./signals";
import { prioritizeSignals } from "../lib/engines/decisionEngine";

export const priorities = prioritizeSignals(signals);
