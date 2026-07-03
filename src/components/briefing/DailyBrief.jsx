import ExecutiveSummary from "./ExecutiveSummary";
import PriorityQueue from "./PriorityQueue";
import BusinessHealthSnapshot from "./BusinessHealthSnapshot";
import TopLocationsToWatch from "./TopLocationsToWatch";
import SuggestedSchedule from "./SuggestedSchedule";

export default function DailyBrief({
  dailyBrief,
  company,
  locations,
  assessments,
}) {
  const locationsToWatch = [...locations]
    .sort((a, b) => a.healthScore - b.healthScore)
    .slice(0, 3);

  return (
    <>
      <ExecutiveSummary dailyBrief={dailyBrief} />
      <PriorityQueue priorities={dailyBrief.priorities} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <BusinessHealthSnapshot company={company} />
      <TopLocationsToWatch
        locations={locationsToWatch}
        assessments={assessments}/>
      </div>

      <SuggestedSchedule schedule={dailyBrief.schedule} />
    </>
  );
}