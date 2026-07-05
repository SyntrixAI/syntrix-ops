import AppLayout from "../components/layout/AppLayout";
import WorkspaceHeader from "../components/business/WorkspaceHeader";
import HealthOverview from "../components/business/HealthOverview";
import DecisionBanner from "../components/business/DecisionBanner";
import KeyInsights from "../components/business/KeyInsights";
import WorkspaceSection from "../components/business/WorkspaceSection";
import OperationsQueue from "../components/operations/InvestigationQueue";
import ExecutionQueue from "../components/execution/ExecutionQueue";

import { getDailyBrief, getUserContext } from "../lib/services";

export default function Home() {
  const user = getUserContext();
  const brief = getDailyBrief(user);

  const {
    health,
    topDecision,
    executiveInsights,
    criticalInvestigations,
    executionQueue,
  } = brief;

  return (
    <AppLayout>
      <section className="mx-auto max-w-7xl space-y-8">
        <WorkspaceHeader
          eyebrow="Daily Brief"
          title={`Good Morning, ${user.name}`}
          decision="Here is what deserves your attention today."
          updatedAt="Updated live"
        />

        <HealthOverview health={health} />

        {topDecision && (
          <DecisionBanner
            decision={topDecision.primaryAction}
            impact={`+$${topDecision.estimatedImpact.toLocaleString()}/wk`}
            confidence={`${topDecision.confidence ?? 90}% confidence`}
            rationale={topDecision.rationale}
            actionLabel="Open Investigation"
          />
        )}

        <KeyInsights insights={executiveInsights} />

        <WorkspaceSection
          label="Critical"
          title="Critical Investigations"
          description="The highest-priority investigations leadership should review first."
        >
          <OperationsQueue operations={criticalInvestigations} />
        </WorkspaceSection>

        <WorkspaceSection
          label="Execution"
          title="Active Playbooks"
          description="Recommended actions currently in motion."
        >
          <ExecutionQueue executions={executionQueue} />
        </WorkspaceSection>
      </section>
    </AppLayout>
  );
}