import AppLayout from "../../../../components/layout/AppLayout";
import InvestigationHeader from "../../../../components/investigations/InvestigationHeader";
import InvestigationOverview from "../../../../components/investigations/InvestigationOverview";
import InvestigationEvidence from "../../../../components/investigations/InvestigationEvidence";
import InvestigationTimeline from "../../../../components/investigations/InvestigationTimeline";
import InvestigationActions from "../../../../components/investigations/InvestigationActions";

import { getInvestigation } from "../../../../lib/selectors";

export default function InvestigationPage({ params }) {
  const investigation = getInvestigation(params.id);

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
        <InvestigationHeader investigation={investigation} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <InvestigationOverview investigation={investigation} />
            <InvestigationEvidence investigation={investigation} />
            <InvestigationTimeline investigation={investigation} />
          </div>

          <div>
            <InvestigationActions investigation={investigation} />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}