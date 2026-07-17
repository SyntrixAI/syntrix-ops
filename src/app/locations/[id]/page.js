import AppLayout from "../../../components/layout/AppLayout";
import WorkspacePage from "../../../components/layout/WorkspacePage";
import {
  getLocationWorkspace,
  getRequestContext,
  getWorkspaceContext,
} from "../../../lib/services";
import WorkspaceBreadcrumbs from "../../../components/business/WorkspaceBreadcrumbs";
import LocationOverview from "../../../components/locations/LocationOverview";
import LocationOperations from "../../../components/locations/LocationOperations";
import LocationExecution from "../../../components/locations/LocationExecution";
import LocationActivity from "../../../components/locations/LocationActivity";
import WorkspaceHeader from "../../../components/business/WorkspaceHeader";
import DecisionBanner from "../../../components/business/DecisionBanner";

export default async function LocationPage({ params }) {
  const { id } = await params;
  const requestContext = getRequestContext();

  const workspace = getLocationWorkspace(
    requestContext,
    id,
  );

  const context = getWorkspaceContext({
    organizationId: requestContext.organizationId,
    type: "location",
    id,
  });

  if (!workspace) {
    return (
      <AppLayout>
        <section className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-white">
            Location not found
          </h1>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceBreadcrumbs items={context?.items} />
        
        <WorkspaceHeader
          eyebrow="Location Workspace"
          title={workspace.location.name}
          decision="How is this location performing and what should I do next?"
          updatedAt="Updated 2 minutes ago"
        />

        <DecisionBanner
          decision={
          workspace.operations.priorities[0]?.primaryAction ??
          "Continue monitoring this location"
          }
          impact={
            workspace.operations.priorities[0]
              ? `+$${workspace.operations.priorities[0].estimatedImpact.toLocaleString()}/wk`
              : null
          }
          confidence={
            workspace.overview.assessment
              ? `${workspace.overview.assessment.confidence}% confidence`
              : null
          }
          actionLabel="Review Workspace"
        />

        <LocationOverview overview={workspace.overview} />
        <LocationOperations operations={workspace.operations} />
        <LocationExecution execution={workspace.execution} />
        <LocationActivity activity={workspace.activity} />
      </WorkspacePage>
    </AppLayout>
  );
}