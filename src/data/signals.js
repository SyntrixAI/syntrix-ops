import { rawEvents } from "./rawEvents";
import { generateSignals } from "../lib/engines/signalEngine";

export const signals = generateSignals(rawEvents);
