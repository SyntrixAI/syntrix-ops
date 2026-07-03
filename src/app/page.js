import AppLayout from "../components/layout/AppLayout";

import DailyBriefHeader from "../components/briefing/DailyBriefHeader";
import DailyBrief from "../components/briefing/DailyBrief";

import HealthCard from "../components/briefing/HealthCard";
import MissionCard from "../components/briefing/MissionCard";
import ImpactCard from "../components/briefing/ImpactCard";

import { company } from "../mock/company";
import { dailyBrief } from "../mock/dailyBrief";



export default function Home() {
  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto">
          <DailyBriefHeader name="Tyson" />

          <p className="text-slate-300 mt-4 max-w-3xl">
            Track company-wide performance, rank every location, and identify
            which stores need attention before problems become expensive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            
            <HealthCard score={company.businessHealth} status={company.healthStatus} confidence={company.confidence}/>

            <MissionCard location={dailyBrief.mission.location} action={dailyBrief.mission.objective}/>

            <ImpactCard amount={dailyBrief.mission.estimatedImpact} period="Estimated Weekly Impact"/>
            
          </div>
              <DailyBrief headline={dailyBrief.headline}
                        findings={dailyBrief.highlights}
                        recommendation={dailyBrief.mission.objective}
                        impact={dailyBrief.mission.estimatedImpact}/>

        </section>
      </AppLayout>
    );
}
