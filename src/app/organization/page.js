import Card from "../../components/ui/Card";
import WorkspacePage from "../../components/layout/WorkspacePage";
import AppLayout from "../../components/layout/AppLayout";
import WorkspaceHeader from "../../components/business/WorkspaceHeader";
import WorkspaceStatus from "../../components/business/WorkspaceStatus";
import HealthOverview from "../../components/business/HealthOverview";
import KeyInsights from "../../components/business/KeyInsights";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import OperationsQueue from "../../components/operations/InvestigationQueue";
import ExecutionQueue from "../../components/execution/ExecutionQueue";
import HierarchyToolbar from "../../components/business/HierarchyToolbar";
import HierarchyTable from "../../components/business/HierarchyTable";
import { getOrganizationWorkspace, getUserContext } from "../../lib/services";

export default function OrganizationPage() {
  const user = getUserContext();
  const workspace = getOrganizationWorkspace(user);

  const {
    overview,
    metrics,
    operations,
    execution,
    organization,
  } = workspace;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow={getWorkspaceEyebrow(user)}
          title={getWorkspaceTitle(user, organization)}
          decision="How is my organization performing, and where should I focus?"
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
            label={getComparisonLabel(user)}
            title={getComparisonTitle(user)}
            description="Compare the operational units within your scope."
        >
            <div className="space-y-4">
                <HierarchyToolbar
                    label={getComparisonLabel(user)}
                    count={getOrganizationCount(user, organization)}
                />

                <HierarchyTable rows={organization.entities} />
            </div>
        </WorkspaceSection>

        <WorkspaceSection
          label="Operations"
          title="Priority Queue"
          description="Prioritized investigations within your organization scope."
        >
          <OperationsQueue operations={operations.priorities} />
        </WorkspaceSection>

        <WorkspaceSection
          label="Execution"
          title="Execution Playbooks"
          description="Recommended operational actions currently in motion."
        >
          <ExecutionQueue executions={execution.items} />
        </WorkspaceSection>
      </WorkspacePage>
    </AppLayout>
  );
}

function getOrganizationCount(user, organization) {
  if (user.scope.level === "company") return organization.regions.length;
  if (user.scope.level === "region") return organization.districts.length;
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

function getWorkspaceEyebrow(user) {
  if (user.scope.level === "company") return "Organization Workspace";
  if (user.scope.level === "region") return "Region Workspace";
  if (user.scope.level === "district") return "District Workspace";
  if (user.scope.level === "location") return "Location Workspace";

  return "Organization Workspace";
}

function getWorkspaceTitle(user, organization) {
  if (user.scope.level === "company") {
    return organization.company?.name ?? "Organization";
  }

  if (user.scope.level === "region") {
    return organization.regions[0]?.name ?? "Region";
  }

  if (user.scope.level === "district") {
    return organization.districts[0]?.name ?? "District";
  }

  if (user.scope.level === "location") {
    return organization.locations[0]?.name ?? "Location";
  }

  return "Organization";
}

function getComparisonLabel(user) {
  if (user.scope.level === "company") return "Regions";
  if (user.scope.level === "region") return "Districts";
  if (user.scope.level === "district") return "Locations";
  if (user.scope.level === "location") return "Location";

  return "Organization";
}

function getComparisonTitle(user) {
  if (user.scope.level === "company") return "Regions in Organization";
  if (user.scope.level === "region") return "Districts in Region";
  if (user.scope.level === "district") return "Locations in District";
  if (user.scope.level === "location") return "Assigned Location";

  return "Organization";
}