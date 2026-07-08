import AppLayout from "../../components/layout/AppLayout";
import WorkspacePage from "../../components/layout/WorkspacePage";

import WorkspaceHeader from "../../components/business/WorkspaceHeader";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import KeyInsights from "../../components/business/KeyInsights";

import OperationsSummary from "../../components/operations/OperationsSummary";
import OperationsQueue from "../../components/operations/InvestigationQueue";

import { getOperationsWorkspace, getUserContext } from "../../lib/services";

export default function OperationsPage() {
  const user = getUserContext();
  const workspace = getOperationsWorkspace(user);

  const { overview, metrics, operations } = workspace;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow="Operations Workspace"
          title="Live Operations"
          decision="What requires leadership attention right now?"
          updatedAt="Updated live"
        />

        <KeyInsights insights={overview.insights} />

        <OperationsSummary
          activeInvestigations={metrics.activePriorities}
          criticalInvestigations={metrics.criticalPriorities}
          monitoring={metrics.monitoring}
          lastUpdated="Live"
        />

        <WorkspaceSection
          label="Operations"
          title="Priority Queue"
          description="Ranked investigations based on severity, business impact, confidence, effort, and operational trend."
        >
          <OperationsQueue operations={operations.priorities} />
        </WorkspaceSection>
      </WorkspacePage>
    </AppLayout>
  );
}