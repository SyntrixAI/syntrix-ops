import { notFound } from "next/navigation";

import AppLayout from "../../../../components/layout/AppLayout";
import WorkspacePage from "../../../../components/layout/WorkspacePage";

import WorkspaceHeader from "../../../../components/business/WorkspaceHeader";

import Situation from "../../../../components/workspace/Situation";
import SyntrixAssessment from "../../../../components/workspace/SyntrixAssessment";
import ExecutionPlaybook from "../../../../components/workspace/ExecutionPlaybook";
import CaseHistory from "../../../../components/workspace/CaseHistory";

import {
  getInvestigationWorkspace,
  getRequestContext,
} from "../../../../lib/services";

export default async function InvestigationPage({
  params,
}) {
  const { id } = await params;

  const requestContext =
    getRequestContext();

  const workspace =
    getInvestigationWorkspace(
      requestContext,
      id,
    );

  if (!workspace) {
    notFound();
  }

  const {
    situation,
    assessment,
    execution,
    history,
  } = workspace;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow="Investigation"
          title={situation.priority.title}
          decision={
            situation.priority.whyNow ??
            situation.signal?.description ??
            "Review Syntrix’s assessment and recommended response."
          }
          updatedAt={
            situation.signal?.detectedAt
              ? `Detected ${situation.signal.detectedAt}`
              : "Updated live"
          }
        />

        <Situation
          situation={situation}
        />

        <SyntrixAssessment
          assessment={assessment}
        />

        <ExecutionPlaybook
          execution={execution}
        />

        <CaseHistory
          history={history}
        />
      </WorkspacePage>
    </AppLayout>
  );
}