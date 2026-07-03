export const assessments = {
  "austin-south": {
    id: "austin-south",

    status: "Open",

    priority: "Critical",

    title: "Lunch Labor Inefficiency",

    assessment:
      "Austin South finished yesterday below forecast because lunch labor remained elevated while guest traffic declined. Protein waste also exceeded historical averages.",

    recommendation: {
  title: "Reduce weekday lunch staffing",
  description:
    "Reduce lunch staffing by one employee beginning tomorrow and audit protein usage before Friday dinner service.",
  effort: "Low",
  estimatedTime: "30–45 min",
  expectedImpact: {
    labor: "-2.1%",
    primeCost: "-1.8%",
  },
},

    businessImpact: {
      weeklyRecovery: 1180,
      annualRecovery: 61360,
    },

    confidence: 97,

    evidence: [
      "90-day sales trend",
      "Labor scheduling",
      "Inventory variance",
      "Historical lunch traffic",
    ],

    metrics: {
      salesVsForecast: -8.7,
      labor: 35.2,
      foodCost: 36.7,
      primeCost: 71.9,
    },

    timeline: [
      {
        time: "10:42 AM",
        event: "Labor exceeded target",
      },
      {
        time: "12:15 PM",
        event: "Sales slowed below forecast",
      },
      {
        time: "2:05 PM",
        event: "Inventory variance detected",
      },
    ],
  },
};