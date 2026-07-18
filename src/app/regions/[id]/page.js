import DecisionPortfolio from "../../../components/business/DecisionPortfolio";
import ExecutionQueue from "../../../components/execution/ExecutionQueue";
import HealthOverview from "../../../components/business/HealthOverview";
import HierarchyTable from "../../../components/business/HierarchyTable";
import HierarchyToolbar from "../../../components/business/HierarchyToolbar";
import KeyInsights from "../../../components/business/KeyInsights";
import WorkspaceSection from "../../../components/business/WorkspaceSection";
import WorkspaceStatus from "../../../components/business/WorkspaceStatus";
import ExecutiveWorkspace from "../../../components/layout/ExecutiveWorkspace";

import {
  getRegionWorkspace,
  getRequestContext,
} from "../../../lib/services";

export default async function RegionPage({ params,}) {
  const { id } = await params;
    
  const requestContext = getRequestContext();

  const workspace =
    getRegionWorkspace(
      requestContext,
      id,
    );

  if (!workspace) {
    return (
      <ExecutiveWorkspace
        eyebrow="Region Workspace"
        title="Workspace unavailable"
        decision="This region is not available within your current organization scope."
      >
        <p className="text-slate-400">
          Your current role does not have access to this region workspace.
        </p>
      </ExecutiveWorkspace>
    );
  }

  const {
    region,
    overview,
    metrics,
    portfolio,
    districts,
    execution,
  } = workspace;

  return (
    <ExecutiveWorkspace
      eyebrow="Region Workspace"
      title={region.name}
      decision="Which district requires regional leadership attention first?"
    >
      <WorkspaceStatus
        status={
          metrics.healthStatus
        }
        activePriorities={
          metrics.activePriorities
        }
        criticalPriorities={
          metrics.criticalPriorities
        }
        estimatedRecovery={
          metrics.estimatedRecovery
        }
      />

      <WorkspaceSection
        label="Regional Focus"
        title="Decision Portfolio"
        description="The highest-value decisions currently requiring regional leadership attention."
      >
        <DecisionPortfolio
          portfolio={portfolio}
        />
      </WorkspaceSection>

      <HealthOverview
        health={overview.health}
      />

      <KeyInsights
        insights={overview.insights}
      />

      <WorkspaceSection
        label="Region Metrics"
        title="Executive Metrics"
        description="A regional snapshot of operational health, priorities, execution, and estimated recovery."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Locations"
            value={
              metrics.totalLocations
            }
          />

          <MetricCard
            label="Operational Health"
            value={
              metrics.operationalHealth
            }
          />

          <MetricCard
            label="Active Priorities"
            value={
              metrics.activePriorities
            }
          />

          <MetricCard
            label="Estimated Recovery"
            value={
              `+$${metrics.estimatedRecovery.toLocaleString()}/wk`
            }
          />
        </div>
      </WorkspaceSection>

      <WorkspaceSection
        label="Districts"
        title="Districts in Region"
        description="Compare the districts operating within this region."
      >
        <div className="space-y-4">
          <HierarchyToolbar
            label="Districts"
            count={districts.length}
          />

          <HierarchyTable
            rows={districts}
          />
        </div>
      </WorkspaceSection>

      <WorkspaceSection
        label="Execution"
        title="Execution Playbooks"
        description="Recommended operational actions currently in motion across this region."
      >
        <ExecutionQueue
          executions={
            execution.items
          }
        />
      </WorkspaceSection>
    </ExecutiveWorkspace>
  );
}

function MetricCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value ?? "—"}
      </p>
    </div>
  );
}