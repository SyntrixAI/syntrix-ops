import Card from "../ui/Card";

export default function InvestigationTimeline({ investigation }) {
  const { assessment, relatedSignal } = investigation;

  const timeline = [
    relatedSignal && {
      time: relatedSignal.detectedAt,
      event: "Signal detected",
      description: relatedSignal.title,
    },
    assessment && {
      time: "Now",
      event: "Assessment generated",
      description: assessment.title,
    },
    {
      time: "Now",
      event: "Priority created",
      description: "Syntrix added this issue to the investigation queue.",
    },
  ].filter(Boolean);

  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">
        Investigation Timeline
      </p>

      <div className="mt-6 space-y-5">
        {timeline.map((item, index) => (
          <div key={index} className="border-l border-slate-800 pl-5">
            <p className="text-sm text-slate-500">{item.time}</p>
            <p className="mt-1 font-semibold text-white">{item.event}</p>
            <p className="mt-1 text-sm text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}