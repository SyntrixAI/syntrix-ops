import AppLayout from "../components/layout/AppLayout";
import DailyBriefHeader from "../components/briefing/DailyBriefHeader";
import DailyBrief from "../components/briefing/DailyBrief";
import { company } from "../data/company";
import { dailyBrief } from "../data/dailyBrief";
import { locations } from "../data/locations";
import { assessments } from "../data/assessments";
import { signals } from "../data/signals";

export default function Home() {
  return (
    <AppLayout>
      <section className="mx-auto max-w-7xl">
        <DailyBriefHeader name="Tyson" />

        <DailyBrief
          dailyBrief={dailyBrief}
          company={company}
          locations={locations}
          assessments={assessments}
          signals={signals}
        />
      </section>
    </AppLayout>
  );
}