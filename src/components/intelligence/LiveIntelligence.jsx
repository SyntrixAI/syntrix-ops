import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ConfidenceIndicator from "./ConfidenceIndicator";
import EvidenceList from "./EvidenceList";
import { getConfidenceLevel } from "../../lib/confidence";

export default function LiveIntelligence({
  intelligenceBrief,
  priorities,
  executionItems,
}) {
  const confidence = getConfidenceLevel(intelligenceBrief.confidence);

  return (
    <section className="mt-10">
      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Live Executive Brief
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white">
              {intelligenceBrief.headline}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              {intelligenceBrief.summary}
            </p>
          </div>

          <Badge tone="success">{intelligenceBrief.generatedAt}</Badge>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">Recommended Decision</p>
            <p className="mt-2 text-xl font-bold text-cyan-400">
              {intelligenceBrief.recommendedDecision}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">Estimated Impact</p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              +${intelligenceBrief.estimatedImpact.toLocaleString()}/wk
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">Execution Items</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {executionItems.length}
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ConfidenceIndicator
          score={intelligenceBrief.confidence}
          confidence={confidence}
        />

        <Card>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Priority Stack
          </p>

          <div className="mt-6 space-y-4">
            {priorities.map((priority) => (
              <div
                key={priority.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">
                      #{priority.priorityRank} {priority.location}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {priority.title}
                    </p>
                  </div>

                  <p className="font-bold text-green-400">
                    +${priority.estimatedImpact.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <EvidenceList
        evidence={intelligenceBrief.evidence.map(
          (item) =>
            `${item.location} · ${item.source} · ${item.severity} · $${item.impact.toLocaleString()} impact`,
        )}
      />
    </section>
  );
}