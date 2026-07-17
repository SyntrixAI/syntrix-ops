import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function InvestigationTimeline({ timeline, }) {
  const { signal, assessment, priority, executionItem } = timeline;

  const events = [
    signal && {
      id: "signal",
      step: "01",
      label: "Signal Detected",
      status: "Complete",
      time: signal.detectedAt,
      title: signal.title,
      description: signal.description,
    },
    assessment && {
      id: "assessment",
      step: "02",
      label: "Assessment Generated",
      status: "Complete",
      time: "Now",
      title: assessment.title,
      description: assessment.assessment,
    },
    priority && {
      id: "priority",
      step: "03",
      label: "Priority Calculated",
      status: "Complete",
      time: "Now",
      title: `Priority Score ${priority.priorityScore}`,
      description: `Ranked #${priority.priorityRank} based on impact, urgency, confidence, effort, and trend.`,
    },
    {
      id: "investigation",
      step: "04",
      label: "Investigation Opened",
      status: "Active",
      time: "Now",
      title: "Investigation workspace created",
      description:
        "Syntrix assembled the assessment, reasoning, priority score, evidence, and execution recommendation.",
    },
    executionItem && {
      id: "execution",
      step: "05",
      label: "Execution Recommended",
      status: "Recommended",
      time: "Now",
      title: executionItem.title,
      description: executionItem.sourceAssessment,
    },
  ].filter(Boolean);

  const statusTone = {
    Complete: "success",
    Active: "info",
    Recommended: "warning",
  };

  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Investigation Timeline
      </p>

      <div className="mt-8 space-y-6">
        {events.map((item) => (
          <div key={item.id} className="relative border-l border-slate-800 pl-6">
            <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-500 bg-slate-950 text-xs font-bold text-cyan-400">
              {item.step}
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold text-white">{item.label}</p>

                  <Badge tone={statusTone[item.status] ?? "info"}>
                    {item.status}
                  </Badge>

                  <span className="text-sm text-slate-500">{item.time}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}