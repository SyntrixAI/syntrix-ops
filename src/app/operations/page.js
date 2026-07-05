import AppLayout from "../../components/layout/AppLayout";

import WorkspaceHeader from "../../components/business/WorkspaceHeader";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import KeyInsights from "../../components/business/KeyInsights";

import OperationsSummary from "../../components/operations/OperationsSummary";
import OperationsQueue from "../../components/operations/InvestigationQueue";
import LiveSignalTimeline from "../../components/operations/LiveSignalTimeline";

import { priorities } from "../../data/priorities";
import { liveTimeline } from "../../data/liveTimeline";

export default function OperationsPage() {
  const activeInvestigations = priorities.length;

  const criticalInvestigations = priorities.filter(
    (priority) => priority.severity === "critical",
  ).length;

  const monitoring = priorities.filter(
    (priority) => priority.status === "monitoring",
  ).length;

  const topPriority = priorities[0];

  const executiveInsights = priorities
    .flatMap((priority) =>
      (priority.insights ?? []).map((insight) => ({
        ...insight,
        id: `${priority.id}-${insight.id}`,
        title: `${priority.location}: ${insight.title}`,
        description: insight.description,
      })),
    )
    .slice(0, 3);

  return (
    <AppLayout>
      <section className="mx-auto max-w-7xl space-y-8">
        <WorkspaceHeader
          eyebrow="Operations Workspace"
          title="Live Operations"
          decision="What requires leadership attention right now?"
          updatedAt="Updated live"
        />

        {topPriority && (
          <KeyInsights insights={executiveInsights} />
        )}

        <OperationsSummary
          activeInvestigations={activeInvestigations}
          criticalInvestigations={criticalInvestigations}
          monitoring={monitoring}
          lastUpdated="Live"
        />

        <WorkspaceSection
          label="Operations"
          title="Priority Queue"
          description="Ranked investigations based on severity, business impact, confidence, effort, and operational trend."
        >
          <OperationsQueue operations={priorities} />
        </WorkspaceSection>

        <WorkspaceSection
          label="Signals"
          title="Live Operational Activity"
          description="Recent operational signals Syntrix is observing across the business."
        >
          <LiveSignalTimeline timeline={liveTimeline} />
        </WorkspaceSection>
      </section>
    </AppLayout>
  );
}