import AppLayout from "../../../../components/layout/AppLayout";
import WorkspacePage from "../../../../components/layout/WorkspacePage";
import InvestigationEvidence from "../../../../components/investigations/InvestigationEvidence";
import InvestigationTimeline from "../../../../components/investigations/InvestigationTimeline";
import ExecutionPlaybook from "../../../../components/casefiles/ExecutionPlaybook";
import InvestigationActivity from "../../../../components/investigations/InvestigationActivity";
import SyntrixAssessment from "../../../../components/casefiles/SyntrixAssessment";
import WorkspaceHeader from "../../../../components/business/WorkspaceHeader";
import DecisionBanner from "../../../../components/business/DecisionBanner";
import PriorityScore from "../../../../components/business/PriorityScore";
import KeyInsights from "../../../../components/business/KeyInsights";
import WorkspaceBreadcrumbs from "../../../../components/business/WorkspaceBreadcrumbs";

import {
  getInvestigationWorkspace,
  getRequestContext,
  getWorkspaceContext,
} from "../../../../lib/services";

export default async function InvestigationPage({
  params,
}) {
  const { id } = await params;
  const requestContext = getRequestContext();

  const investigation =
    getInvestigationWorkspace(
      requestContext,
      id,
    );

  if (!investigation) {
    return (
      <AppLayout>
        <section className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-white">
            Investigation not found
          </h1>
        </section>
      </AppLayout>
    );
  }

  const context = getWorkspaceContext({
    organizationId:
      requestContext.organizationId,
    type: "investigation",
    id,
  });

  const {
    header,
    assessmentSection,
    evidenceSection,
    timelineSection,
    executionSection,
    activitySection,
  } = investigation;

  const { priority } = header;

  const { assessment } =
    assessmentSection;

  const {
    recommendation,
    executionItem,
  } = executionSection;

  const { activity } =
    activitySection;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceBreadcrumbs
          items={context?.items}
        />

        <WorkspaceHeader
          eyebrow="Investigation"
          title={priority.title}
          decision="Why is this happening and what action should I take?"
          updatedAt="Updated 5 minutes ago"
        />

        <DecisionBanner
          decision={
            recommendation?.title ??
            executionItem?.title ??
            priority.primaryAction
          }
          impact={`+$${(
            executionItem
              ?.businessImpact
              ?.weeklyRecovery ??
            priority.estimatedImpact ??
            0
          ).toLocaleString()}/wk`}
          confidence={`${
            assessment?.confidence ??
            priority.confidence ??
            90
          }% confidence`}
          rationale={
            priority.rationale
          }
          actionLabel="Send to Execution"
        />

        <PriorityScore
          priority={priority}
        />

        <KeyInsights
          insights={
            priority.insights ?? []
          }
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <SyntrixAssessment
              assessmentSection={assessmentSection}
            />

            <InvestigationEvidence
              evidence={evidenceSection}
            />

            <InvestigationTimeline
              timeline={timelineSection}
            />

            <InvestigationActivity
              activity={activity}
            />
          </div>

          <div>
            <ExecutionPlaybook
              execution={executionSection}
            />
          </div>
        </div>
      </WorkspacePage>
    </AppLayout>
  );
}