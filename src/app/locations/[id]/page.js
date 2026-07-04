import AppLayout from "../../../components/layout/AppLayout";
import OperationalAssessment from "../../../components/intelligence/OperationalAssessment";
import { getLocationWorkspace } from "../../../lib/services";
import LocationOverview from "../../../components/locations/LocationOverview";
import LocationOperations from "../../../components/locations/LocationOperations";
import LocationExecution from "../../../components/locations/LocationExecution";
import LocationActivity from "../../../components/locations/LocationActivity";

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
        <p className="text-sm font-semibold text-cyan-400">
          LOCATION WORKSPACE
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white">
          {workspace.location.name}
        </h1>

        <p className="mt-4 text-slate-300">
          How is this location performing, and what should we do next?
        </p>

        <LocationOverview overview={workspace.overview} />
        <LocationOperations operations={workspace.operations} />
        <LocationExecution execution={workspace.execution} />
        <LocationActivity activity={workspace.activity} />
        
      </section>
    </AppLayout>
  );
}