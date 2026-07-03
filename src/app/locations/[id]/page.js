import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/ui/Card";
import { locations } from "../../../data/locations";

import OperationalAssessment from "../../../components/intelligence/OperationalAssessment";
import { assessments } from "../../../data/assessments";

export default async function LocationDetailPage({ params }) {
  const { id } = await params;
  const location = locations.find((store) => store.id === id);
  
  if (!location) {
    return (
      <AppLayout>
        <h1 className="text-4xl font-bold">Location not found</h1>
      </AppLayout>
    );
  }

const assessment = assessments[location.id];

if (!assessment) {
  return (
    <AppLayout>
      <h1 className="text-4xl font-bold">Assessment not found</h1>
    </AppLayout>
  );
}

  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold tracking-wider text-cyan-400">
          LOCATION DETAIL
        </p>

        <h1 className="mt-3 text-5xl font-bold">{location.name}</h1>

        <p className="mt-3 text-slate-400">
          Manager: {location.manager} • Region: {location.region}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <p className="text-slate-400">Health Score</p>
            <h2 className="mt-3 text-5xl font-bold text-red-400">
              {location.healthScore}
            </h2>
          </Card>

          <Card>
            <p className="text-slate-400">Sales vs Forecast</p>
            <h2 className="mt-3 text-5xl font-bold">
              {location.salesVsForecast > 0 ? "+" : ""}
              {location.salesVsForecast}%
            </h2>
          </Card>

          <Card>
            <p className="text-slate-400">Labor</p>
            <h2 className="mt-3 text-5xl font-bold">{location.labor}%</h2>
          </Card>

          <Card>
            <p className="text-slate-400">Prime Cost</p>
            <h2 className="mt-3 text-5xl font-bold">{location.primeCost}%</h2>
          </Card>
        </div>

        <OperationalAssessment assessment={assessment} />
      </section>
    </AppLayout>
  );
}
