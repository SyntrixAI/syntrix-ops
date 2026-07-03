import AppLayout from "../../components/layout/AppLayout";

import OperationsSummary from "../../components/operations/OperationsSummary";
import OperationsQueue from "../../components/operations/InvestigationQueue";
import { operationsQueue } from "../../data/operations";

export default function OperationsPage() {
  const activeInvestigations = operationsQueue.length;
  const criticalInvestigations = operationsQueue.filter(
    (operation) => operation.priority === "critical",
  ).length;
  const monitoring = operationsQueue.filter(
    (operation) => operation.status === "Monitoring",
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
          lastUpdated="10:42 AM"
        />
        <OperationsQueue operations={operationsQueue} />
      </section>
    </AppLayout>
  );
}
