import AppLayout from "../../../components/layout/AppLayout";
import { getLocationWorkspace } from "../../../lib/services";
import LocationOverview from "../../../components/locations/LocationOverview";
import LocationOperations from "../../../components/locations/LocationOperations";
import LocationExecution from "../../../components/locations/LocationExecution";
import LocationActivity from "../../../components/locations/LocationActivity";
import WorkspaceHeader from "../../../components/business/WorkspaceHeader";

export default async function LocationPage({ params }) {
  const { id } = await params;
  const workspace = getLocationWorkspace(id);

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
      <section className="mx-auto max-w-7xl">
        <WorkspaceHeader
          eyebrow="Location Workspace"
          title={workspace.location.name}
          decision="How is this location performing and what should I do next?"
          updatedAt="Updated 2 minutes ago"
        />

        <LocationOverview overview={workspace.overview} />
        <LocationOperations operations={workspace.operations} />
        <LocationExecution execution={workspace.execution} />
        <LocationActivity activity={workspace.activity} />
      </section>
    </AppLayout>
  );
}