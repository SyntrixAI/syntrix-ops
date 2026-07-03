import AppLayout from "../../components/layout/AppLayout";
import LocationToolbar from "../../components/locations/LocationToolbar";
import LocationTable from "../../components/locations/LocationTable";

import { locations } from "../../data/locations";

export default function LocationsPage() {
  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider text-cyan-400">
              LOCATIONS
            </p>

            <h1 className="mt-3 text-5xl font-bold">Compare Every Location</h1>

            <p className="mt-4 max-w-3xl text-slate-300">
              Compare performance across every location, region, and district.
            </p>
          </div>
        </div>

        <LocationToolbar />

        <LocationTable locations={locations} />
      </section>
    </AppLayout>
  );
}
