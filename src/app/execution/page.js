import AppLayout from "../../components/layout/AppLayout";
import ExecutionHeader from "../../components/execution/ExecutionHeader";
import OpportunityPipeline from "../../components/execution/OpportunityPipeline";
import ExecutionQueue from "../../components/execution/ExecutionQueue";

import { executionItems } from "../../data/executionItems";
import { opportunityPipeline } from "../../data/executions";

export default function ExecutionPage() {
  return (
    <AppLayout>
      <section className="mx-auto max-w-7xl">
        <ExecutionHeader />
        <OpportunityPipeline stages={opportunityPipeline} />
        <ExecutionQueue executions={executionItems} />
      </section>
    </AppLayout>
  );
}