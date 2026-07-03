import { locations } from "../data/companyData";
import DailyBriefHeader from "../components/briefing/DailyBriefHeader";
import HealthCard from "../components/cards/HealthCard";
import MissionCard from "../components/cards/MissionCard";
import ImpactCard from "../components/cards/ImpactCard";
import DailyBrief from "../components/briefing/DailyBrief";
import AppLayout from "../components/layout/AppLayout";


function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

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
            
            <HealthCard score={91} status="Excellent" confidence={98} />

            <MissionCard location="Austin South" action="Review staffing"/>

            <ImpactCard amount="+$1,180" period="per week"/>
            
          </div>
              <DailyBrief headline="Revenue increased 4.2% while prime cost improved 0.8%."
                        findings={[
                          "Austin South exceeded labor target by 3.1%",
                          "Houston inventory variance increased 7%",
                          "Plano remains the highest-performing location",
                                  ]}
                        recommendation="Review Austin South staffing before Friday dinner."
                        impact="+$1,180/week"/>

        </section>
      </AppLayout>
    );
}
