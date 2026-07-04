import { signals } from "./signals";
import { generateLiveTimeline } from "../lib/engines";

export const liveTimeline = generateLiveTimeline(signals);