import {
  createAssessment,
} from "../models";

export function generateAssessments(
  priorities = [],
) {
  if (!Array.isArray(priorities)) {
    throw new Error(
      "Assessment Engine requires priorities to be an array.",
    );
  }

  return priorities.reduce(
    (
      assessmentsByLocation,
      priority,
    ) => {
      const weeklyRecovery =
        normalizeNumber(
          priority.estimatedImpact,
        );

      const confidence =
        priority.confidence ??
        getDefaultConfidence(
          priority,
        );

      assessmentsByLocation[
        priority.locationId
      ] = createAssessment({
        id:
          `assessment-${priority.id}`,

        organizationId:
          priority.organizationId ??
          null,

        priorityId:
          priority.id,

        locationId:
          priority.locationId,

        location:
          priority.location ??
          null,

        status:
          getAssessmentStatus(
            priority.status,
          ),

        priority:
          getPriorityLabel(
            priority.severity,
          ),

        title:
          getAssessmentTitle(
            priority,
          ),

        assessment:
          generateAssessmentNarrative(
            priority,
          ),

        recommendation: {
          title:
            priority.primaryAction ??
            null,

          description:
            generateRecommendationDescription(
              priority,
            ),

          effort:
            priority.effort ??
            "Medium",

          estimatedTime:
            priority.estimatedTime ??
            null,

          expectedImpact:
            generateExpectedImpact(
              priority,
            ),
        },

        businessImpact: {
          weeklyRecovery,

          annualRecovery:
            weeklyRecovery * 52,
        },

        confidence,

        evidence:
          generateEvidence(
            priority,
          ),

        metrics:
          generateMetrics(
            priority,
          ),

        timeline:
          generateTimeline(
            priority,
          ),

        createdAt:
          priority.detectedAt ??
          null,

        updatedAt:
          null,
      });

      return assessmentsByLocation;
    },
    {},
  );
}

function getAssessmentStatus(status) {
  const normalizedStatus =
    normalizeText(status);

  if (
    normalizedStatus ===
    "monitoring"
  ) {
    return "Monitoring";
  }

  if (
    normalizedStatus ===
    "resolved"
  ) {
    return "Resolved";
  }

  return "Open";
}

function getPriorityLabel(severity) {
  const normalizedSeverity =
    normalizeText(severity);

  if (
    normalizedSeverity ===
    "critical"
  ) {
    return "Critical";
  }

  if (
    normalizedSeverity ===
    "warning"
  ) {
    return "High";
  }

  if (
    normalizedSeverity ===
    "info"
  ) {
    return "Medium";
  }

  return "Low";
}

function getAssessmentTitle(priority) {
  const category =
    normalizeText(
      priority?.category,
    );

  if (category === "labor") {
    return "Labor Efficiency Risk";
  }

  if (category === "inventory") {
    return "Inventory Variance Risk";
  }

  if (category === "sales") {
    return "Sales Recovery Signal";
  }

  const categoryLabel =
    priority?.category ??
    "Operational";

  return `${categoryLabel} Assessment`;
}

function generateAssessmentNarrative(
  priority,
) {
  const location =
    priority.location ??
    "This location";

  const severity =
    normalizeText(
      priority.severity,
    ) || "operational";

  const category =
    normalizeText(
      priority.category,
    ) || "performance";

  const impact =
    normalizeNumber(
      priority.estimatedImpact,
    );

  const action =
    priority.primaryAction ??
    "Review the issue";

  const description =
    priority.description
      ? `${priority.description} `
      : "";

  return (
    `${location} triggered a ` +
    `${severity} ${category} signal. ` +
    `${description}` +
    `Syntrix estimates this represents ` +
    `approximately $${impact.toLocaleString()} ` +
    `in weekly business impact and ` +
    `recommends: ${action}.`
  );
}

function generateRecommendationDescription(
  priority,
) {
  const severity =
    normalizeText(
      priority.severity,
    );

  if (severity === "critical") {
    return (
      "Review the issue immediately, " +
      "confirm the underlying data, " +
      "and take action within " +
      `${
        priority.estimatedTime ??
        "30–45 min"
      }.`
    );
  }

  if (severity === "warning") {
    return (
      "Investigate the variance, " +
      "compare it against recent " +
      "operating patterns, and confirm " +
      "whether corrective action is needed."
    );
  }

  return (
    "Continue monitoring this signal " +
    "and watch for repeat patterns " +
    "before escalating."
  );
}

function generateExpectedImpact(
  priority,
) {
  const category =
    normalizeText(
      priority.category,
    );

  if (category === "labor") {
    return {
      labor: "-2.1%",
      primeCost: "-1.8%",
    };
  }

  if (category === "inventory") {
    return {
      foodCost: "-1.4%",
      primeCost: "-1.1%",
    };
  }

  if (category === "sales") {
    return {
      sales: "+1.6%",
      guestTraffic: "+1.2%",
    };
  }

  return {
    profit:
      `+$${normalizeNumber(
        priority.estimatedImpact,
      ).toLocaleString()}/wk`,
  };
}

function getDefaultConfidence(
  priority,
) {
  const severity =
    normalizeText(
      priority?.severity,
    );

  if (severity === "critical") {
    return 94;
  }

  if (severity === "warning") {
    return 88;
  }

  return 82;
}

function generateEvidence(priority) {
  const baseEvidence = [
    priority.source ??
      "Operational signal",

    "Recent operating trend",

    "Location-level performance",
  ];

  const category =
    normalizeText(
      priority.category,
    );

  if (category === "labor") {
    return [
      ...baseEvidence,
      "Labor scheduling",
      "Sales forecast variance",
    ];
  }

  if (category === "inventory") {
    return [
      ...baseEvidence,
      "Inventory variance",
      "Product usage trend",
    ];
  }

  if (category === "sales") {
    return [
      ...baseEvidence,
      "Sales forecast",
      "Promotion performance",
    ];
  }

  return baseEvidence;
}

function generateMetrics(priority) {
  const category =
    normalizeText(
      priority.category,
    );

  if (category === "labor") {
    return {
      salesVsForecast: -8.7,
      labor: 35.2,
      foodCost: 36.7,
      primeCost: 71.9,
    };
  }

  if (category === "inventory") {
    return {
      salesVsForecast: -2.1,
      labor: 31.4,
      foodCost: 37.9,
      primeCost: 69.3,
    };
  }

  if (category === "sales") {
    return {
      salesVsForecast: 3.4,
      labor: 29.8,
      foodCost: 33.2,
      primeCost: 63,
    };
  }

  return {
    salesVsForecast: 0,
    labor: 0,
    foodCost: 0,
    primeCost: 0,
  };
}

function generateTimeline(priority) {
  return [
    {
      time:
        priority.detectedAt ??
        null,

      event:
        priority.title ??
        "Signal detected",
    },

    {
      time: "Now",

      event:
        `${
          priority.primaryAction ??
          "Review"
        } recommended`,
    },
  ];
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function normalizeNumber(value) {
  const numericValue =
    Number(value);

  return Number.isFinite(
    numericValue,
  )
    ? numericValue
    : 0;
}