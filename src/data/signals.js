import { rawEvents } from "./rawEvents";
import { generateSignals } from "../lib/signalEngine";

export const signals = generateSignals(rawEvents);