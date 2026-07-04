import { signals } from "./signals";
import { prioritizeSignals } from "../lib/decisionEngine";

export const priorities = prioritizeSignals(signals);