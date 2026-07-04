import { generateSignals } from "../lib/signalEngine";

const rawEvents = [
  {
    id: 1,
    severity: "critical",
    category: "Labor",
    source: "Scheduling",
    locationId: "austin-south",
    location: "Austin South",
    title: "Lunch labor exceeded target",
    description:
      "Lunch labor exceeded target by 4.2% for the third consecutive day.",
    detectedAt: "10 minutes ago",
    estimatedImpact: 1180,
    effort: "Low",
    estimatedTime: "30–45 min",
  },
  {
    id: 2,
    severity: "warning",
    category: "Inventory",
    source: "Inventory",
    locationId: "houston",
    location: "Houston",
    title: "Protein variance increased",
    description:
      "Inventory variance exceeded the acceptable threshold during yesterday's count.",
    detectedAt: "32 minutes ago",
    estimatedImpact: 620,
    effort: "Medium",
    estimatedTime: "45–60 min",
  },
  {
    id: 3,
    severity: "info",
    category: "Sales",
    source: "POS",
    locationId: "plano",
    location: "Plano",
    title: "Sales exceeded forecast",
    description:
      "Yesterday's sales finished 12.1% above forecast, creating an opportunity to review staffing and operating practices.",
    detectedAt: "1 hour ago",
    estimatedImpact: 450,
    effort: "Low",
    estimatedTime: "20 min",
  },
];

export const signals = generateSignals(rawEvents);