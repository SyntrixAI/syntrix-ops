import AppLayout from "../components/layout/AppLayout";
import WorkspacePage from "../components/layout/WorkspacePage";
import WorkspaceHeader from "../components/business/WorkspaceHeader";
import HealthOverview from "../components/business/HealthOverview";
import DecisionBanner from "../components/business/DecisionBanner";
import KeyInsights from "../components/business/KeyInsights";
import WorkspaceSection from "../components/business/WorkspaceSection";
import OperationsQueue from "../components/operations/InvestigationQueue";
import ExecutionQueue from "../components/execution/ExecutionQueue";

import { getDailyBrief, getRequestContext, } from "../lib/services";

export default function Home() {
  const requestContext = getRequestContext();
  const brief = getDailyBrief(requestContext);

  const {
    health,
    topDecision,
    executiveInsights,
    criticalInvestigations,
    executionQueue,
  } = brief;

  const topExecutionItem = executionQueue[0];

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow="Daily Brief"
          title={`Good Morning, ${requestContext.user.name}`}
          decision="Here is what deserves your attention today."
          updatedAt="Updated live"
        />

        <HealthOverview health={health} />

        {topDecision && (
          <DecisionBanner
            decision={topExecutionItem?.title ?? topDecision.primaryAction}
            impact={`+$${(
              topExecutionItem?.businessImpact?.weeklyRecovery ??
              topDecision.estimatedImpact ??
              0
            ).toLocaleString()}/wk`}
            confidence={`${topExecutionItem?.confidence ?? topDecision.confidence ?? 90}% confidence`}
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
      </WorkspacePage>
    </AppLayout>
  );
}