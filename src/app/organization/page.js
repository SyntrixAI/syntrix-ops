import Card from "../../components/ui/Card";
import ExecutiveWorkspace from "../../components/layout/ExecutiveWorkspace";
import WorkspaceStatus from "../../components/business/WorkspaceStatus";
import HealthOverview from "../../components/business/HealthOverview";
import KeyInsights from "../../components/business/KeyInsights";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import OperationsQueue from "../../components/operations/InvestigationQueue";
import ExecutionQueue from "../../components/execution/ExecutionQueue";
import HierarchyToolbar from "../../components/business/HierarchyToolbar";
import HierarchyTable from "../../components/business/HierarchyTable";
import { getOrganizationWorkspace, getRequestContext, } from "../../lib/services";

export default function OrganizationPage() {
  const requestContext = getRequestContext();
  const workspace = getOrganizationWorkspace(requestContext);

  if (!workspace) {
  return (
    <ExecutiveWorkspace
      eyebrow="Organization Workspace"
      title="Workspace unavailable"
      decision="This workspace is only available to company-level leadership."
    >
      <p className="text-slate-400">
        Your current role does not have access to the organization workspace.
      </p>
    </ExecutiveWorkspace>
  );
}

  const scopeLevel = requestContext.membership.scopeLevel;

  const {
    overview,
    metrics,
    operations,
    execution,
    organization,
  } = workspace;

  return (
    <ExecutiveWorkspace
      eyebrow={getWorkspaceEyebrow(scopeLevel)}
      title={getWorkspaceTitle(scopeLevel, organization,)}
      decision="How is my organization performing, and where should I focus?"
    >

      <WorkspaceStatus
        status={metrics.healthStatus}
        activePriorities={metrics.activePriorities}
        criticalPriorities={metrics.criticalPriorities}          estimatedRecovery={metrics.estimatedRecovery}
      />

       <HealthOverview health={overview.health} />

      <KeyInsights insights={overview.insights} />

      <WorkspaceSection
        label="Organization Metrics"
        title="Executive Metrics"
        description="A scope-aware snapshot of operational health, priorities, execution, and estimated recovery."
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
        label={getComparisonLabel(scopeLevel)}
        title={getComparisonTitle(scopeLevel)}
        description="Compare the operational units within your scope."
      >
        <div className="space-y-4">
          <HierarchyToolbar
            label={getComparisonLabel(scopeLevel)}
            count={getOrganizationCount(scopeLevel, organization,)}
          />

          <HierarchyTable rows={organization.entities} />
        </div>
      </WorkspaceSection>

      <WorkspaceSection
        label="Operations"
        title="Priority Queue"
        description="Prioritized investigations within your organization scope."
      >
        <OperationsQueue priorities={operations.priorities} />
      </WorkspaceSection>

      <WorkspaceSection
        label="Execution"
        title="Execution Playbooks"
        description="Recommended operational actions currently in motion."
      >
        <ExecutionQueue executions={execution.items} />
      </WorkspaceSection>
    </ExecutiveWorkspace>
  );
}

function getOrganizationCount(scopeLevel, organization,) {
  if (scopeLevel === "company") {
    return organization.regions.length;
  }

  if (scopeLevel === "region") {
    return organization.districts.length;
  }

  return organization.locations.length;
}

function MetricCard({ label, value }) {
  return (
    <Card>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value ?? "—"}</p>
    </Card>
  );
}

function getWorkspaceEyebrow(scopeLevel) {
  if (scopeLevel === "company") return "Organization Workspace";
  if (scopeLevel === "region") return "Region Workspace";
  if (scopeLevel === "district") return "District Workspace";
  if (scopeLevel === "location") return "Location Workspace";

  return "Organization Workspace";
}

function getWorkspaceTitle(scopeLevel, organization,) {
  if (scopeLevel === "company") {
    return organization.company?.name ?? "Organization";
  }

  if (scopeLevel === "region") {
    return organization.regions[0]?.name ?? "Region";
  }

  if (scopeLevel === "district") {
    return organization.districts[0]?.name ?? "District";
  }

  if (scopeLevel === "location") {
    return organization.locations[0]?.name ?? "Location";
  }

  return "Organization";
}

function getComparisonLabel(scopeLevel) {
  if (scopeLevel === "company") return "Regions";
  if (scopeLevel === "region") return "Districts";
  if (scopeLevel === "district") return "Locations";
  if (scopeLevel === "location") return "Location";

  return "Organization";
}

function getComparisonTitle(scopeLevel) {
  if (scopeLevel === "company") return "Regions in Organization";
  if (scopeLevel === "region") return "Districts in Region";
  if (scopeLevel === "district") return "Locations in District";
  if (scopeLevel === "location") return "Assigned Location";

  return "Organization";
}