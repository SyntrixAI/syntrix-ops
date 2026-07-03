export const dailyBrief = {
  generatedAt: "7:03 AM",

  executiveSummary: {
  yesterday:
    "Business Health improved from 89 to 91 after labor efficiency gains across Dallas North and Plano.",
  today:
    "Austin South remains the highest operational priority after lunch labor exceeded target for a third consecutive day.",
  recommendation:
    "Visit Austin South first. Audit Houston inventory next. Review Plano scheduling last.",
  estimatedRecovery: {
  amount: 1180,
  period: "week"},
},

priorities: [
  {
    id: 1,
    priority: "Critical",
    title: "Visit Austin South",
    reason: "Lunch labor exceeded target for a third consecutive day.",
    impact: {
      amount: 1180,
      period: "week",
    },
    effort: "Low",
    estimatedTime: "30–45 min",
    nextStep: "Open assessment",
  },
  {
    id: 2,
    priority: "High",
    title: "Audit Houston inventory",
    reason: "Protein variance increased above acceptable threshold.",
    impact: {
      amount: 620,
      period: "week",
    },
    effort: "Medium",
    estimatedTime: "45–60 min",
    nextStep: "Review variance",
  },
  {
    id: 3,
    priority: "Medium",
    title: "Review Plano scheduling",
    reason: "Sales exceeded forecast and staffing model may be reusable.",
    impact: {
      amount: 450,
      period: "week",
    },
    effort: "Low",
    estimatedTime: "20 min",
    nextStep: "Compare staffing",
  },
],

schedule: [
  { time: "9:00 AM", task: "Review overnight performance" },
  { time: "10:30 AM", task: "Call Emily Carter at Austin South" },
  { time: "1:00 PM", task: "Visit Austin South" },
  { time: "4:00 PM", task: "Review labor forecast" },
],

};