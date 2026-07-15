import { signals } from "./signals";
import { generateLiveTimeline } from "../lib/engines/timelineEngine";

export const liveTimeline = generateLiveTimeline(signals);