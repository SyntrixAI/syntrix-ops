import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function IntelligenceStory({ item, featured = false }) {
  if (!item) return null;

  const { priority, recommendation, rootCauses = [], trends = [] } = item;

  return (
    <Card className={featured ? "border-cyan-500/30 bg-cyan-950/10" : ""}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-400">
            {featured ? "Top Story" : priority.location}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {priority.title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            {recommendation?.reasoning}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Badge tone="info">{priority.priorityScore} Priority Score</Badge>

            <Badge tone="success">
              +${priority.estimatedImpact.toLocaleString()}/week
            </Badge>
          </div>
        </div>

        <Link
          href={`/operations/investigations/${priority.id}`}
          className="rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Open Investigation →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <StoryPanel title="Root Cause" items={rootCauses} />
        <StoryPanel title="Trend" items={trends} />
        <MemoryPanel summary={item.memorySummary} />
      </div>
    </Card>
  );
}

function StoryPanel({ title, items = [] }) {
  const firstItem = items[0];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>

      {firstItem ? (
        <>
          <p className="mt-3 text-sm font-semibold text-slate-300">
            {firstItem.title}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            {firstItem.description}
          </p>
        </>
      ) : (
        <p className="mt-3 text-sm text-slate-500">
          No intelligence available yet.
        </p>
      )}
    </div>
  );
}

function MemoryPanel({ summary }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-sm font-semibold text-white">Operational Memory</p>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {summary}
      </p>
    </div>
  );
}