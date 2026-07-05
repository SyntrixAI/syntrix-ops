import AppLayout from "../../../../components/layout/AppLayout";
import InvestigationEvidence from "../../../../components/investigations/InvestigationEvidence";
import InvestigationTimeline from "../../../../components/investigations/InvestigationTimeline";
import InvestigationActions from "../../../../components/investigations/InvestigationActions";
import InvestigationActivity from "../../../../components/investigations/InvestigationActivity";
import SyntrixAssessment from "../../../../components/compositions/SyntrixAssessment";
import InvestigationContext from "../../../../components/investigations/InvestigationReasoning";
import WorkspaceHeader from "../../../../components/business/WorkspaceHeader";
import DecisionBanner from "../../../../components/business/DecisionBanner";
import PriorityScore from "../../../../components/business/PriorityScore";

import { getInvestigation } from "../../../../lib/selectors";

export default async function InvestigationPage({ params }) {
  const { id } = await params;

  const investigation = getInvestigation(id);

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

  return (
    <AppLayout>
      <section className="mx-auto max-w-7xl">

        <WorkspaceHeader
           eyebrow="Investigation"
           title={investigation.priority.title}
           decision="Why is this happening and what action should I take?"
           updatedAt="Updated 5 minutes ago"
        />

        <DecisionBanner
           decision={investigation.priority.primaryAction}
           impact={`+$${investigation.priority.estimatedImpact.toLocaleString()}/wk`}
           confidence={`${investigation.assessment?.confidence ?? 90}% confidence`}
           actionLabel="Send to Execution"
        />

        <PriorityScore priority={investigation.priority} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <SyntrixAssessment assessment={investigation.assessment} />
            <InvestigationContext context={investigation.context}/>
            <InvestigationEvidence investigation={investigation} />
            <InvestigationTimeline investigation={investigation} />
            <InvestigationActivity activity={investigation.activity} />
          </div>
        <div>

        <InvestigationActions investigation={investigation} />

          </div>
        </div>
      </section>
    </AppLayout>
  );
}