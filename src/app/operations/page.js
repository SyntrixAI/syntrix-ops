import AppLayout from "../../components/layout/AppLayout";

import OperationsSummary from "../../components/operations/OperationsSummary";
import OperationsQueue from "../../components/operations/InvestigationQueue";
import { priorities } from "../../data/priorities";

export default function OperationsPage() {
  const activeInvestigations = priorities.length;
  const criticalInvestigations = priorities.filter(
    (priority) => priority.severity === "critical",
  ).length;
  const monitoring = priorities.filter(
    (priority) => priority.status === "monitoring",
  ).length;

  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-cyan-400">OPERATIONS</p>

        <h1 className="mt-4 text-5xl font-bold text-white">Live Operations</h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Show me where and what I need to investigate right now.
        </p>

        <OperationsSummary
          activeInvestigations={activeInvestigations}
          criticalInvestigations={criticalInvestigations}
          monitoring={monitoring}
          lastUpdated="Live"
        />

        <OperationsQueue operations={priorities} />
      </section>
    </AppLayout>
  );
}