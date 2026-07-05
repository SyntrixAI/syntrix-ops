import Link from "next/link";
import AppLayout from "../../../components/layout/AppLayout";
import WorkspacePage from "../../../components/layout/WorkspacePage";
import WorkspaceBreadcrumbs from "../../../components/business/WorkspaceBreadcrumbs";
import { getDistrictWorkspace, getUserContext, getWorkspaceContext } from "../../../lib/services";
import WorkspaceHeader from "../../../components/business/WorkspaceHeader";
import HealthOverview from "../../../components/business/HealthOverview";
import KeyInsights from "../../../components/business/KeyInsights";
import WorkspaceSection from "../../../components/business/WorkspaceSection";
import WorkspaceStatus from "../../../components/business/WorkspaceStatus";
import OperationsQueue from "../../../components/operations/InvestigationQueue";
import ExecutionQueue from "../../../components/execution/ExecutionQueue";
import Card from "../../../components/ui/Card";



export default async function DistrictPage({ params }) {
  const { id } = await params;
  const user = getUserContext();
  const workspace = getDistrictWorkspace(user, id);
  const context = getWorkspaceContext({ type: "district", id, });

  if (!workspace) {
    return (
      <AppLayout>
        <section className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-white">
            District not found
          </h1>
        </section>
      </AppLayout>
    );
  }

  const {
    district,
    region,
    company,
    locations,
    overview,
    operations,
    execution,
    metrics,
  } = workspace;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceBreadcrumbs items={context?.items} />

        <WorkspaceHeader
          eyebrow="District Workspace"
          title={district.name}
          decision="Which locations in this district need leadership attention?"
          updatedAt="Updated live"
        />

        <WorkspaceStatus
          status={metrics.healthStatus}
          activePriorities={metrics.activePriorities}
          criticalPriorities={metrics.criticalPriorities}
          estimatedRecovery={metrics.estimatedRecovery}
        />

        <HealthOverview health={overview.health} />

        <KeyInsights insights={overview.insights} />

        <WorkspaceSection
          label="District Metrics"
          title="Executive Metrics"
          description="A district-level snapshot of operational health, priorities, execution, and estimated recovery."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Locations" value={metrics.totalLocations} />
            <MetricCard
              label="Operational Health"
              value={metrics.operationalHealth}
            />
            <MetricCard
              label="Active Priorities"
              value={metrics.activePriorities}
            />
            <MetricCard
              label="Estimated Recovery"
              value={`+$${metrics.estimatedRecovery.toLocaleString()}/wk`}
            />
          </div>
        </WorkspaceSection>

        <WorkspaceSection
          label="Locations"
          title="Locations in District"
          description={`${district.name} includes ${locations.length} locations in ${region.name}.`}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card key={location.id}>
                <p className="text-sm font-semibold text-cyan-400">
                  {location.region}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {location.name}
                </h3>

                <p className="mt-2 text-slate-400">
                  {location.city}, {location.state}
                </p>

                <Link
                  href={`/locations/${location.id}`}
                  className="mt-5 inline-block font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Open Location →
                </Link>
              </Card>
            ))}
          </div>
        </WorkspaceSection>

        <WorkspaceSection
          label="Operations"
          title="District Priority Queue"
          description="Prioritized investigations across locations in this district."
        >
          <OperationsQueue operations={operations.priorities} />
        </WorkspaceSection>

        <WorkspaceSection
          label="Execution"
          title="District Execution Playbooks"
          description="Recommended actions currently in motion across this district."
        >
          <ExecutionQueue executions={execution.items} />
        </WorkspaceSection>
      </WorkspacePage>
    </AppLayout>
  );
}

function MetricCard({ label, value }) {
  return (
    <Card>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value ?? "—"}</p>
    </Card>
  );
}