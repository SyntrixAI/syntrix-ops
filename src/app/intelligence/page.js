import AppLayout from "../../components/layout/AppLayout";
import WorkspacePage from "../../components/layout/WorkspacePage";
import WorkspaceHeader from "../../components/business/WorkspaceHeader";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

import { getIntelligenceWorkspace, getUserContext } from "../../lib/services";

export default function IntelligencePage() {
  const user = getUserContext();
  const workspace = getIntelligenceWorkspace(user);

  const { summary, intelligence } = workspace;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow="Syntrix Intelligence"
          title={summary.title}
          decision="What does Syntrix understand about the business right now?"
          updatedAt="Updated live"
        />

        {summary.topInsight && (
          <WorkspaceSection
            label="Top Insight"
            title={summary.topInsight.priority.title}
            description={summary.topInsight.memorySummary}
          >
            <IntelligenceCard item={summary.topInsight} />
          </WorkspaceSection>
        )}

        <WorkspaceSection
          label="Intelligence"
          title="Executive Reasoning"
          description="Root causes, trends, memory, and recommendation context across your scope."
        >
          <div className="space-y-6">
            {intelligence.items.map((item) => (
              <IntelligenceCard key={item.priority.id} item={item} />
            ))}
          </div>
        </WorkspaceSection>
      </WorkspacePage>
    </AppLayout>
  );
}

function IntelligenceCard({ item }) {
  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-400">
            {item.priority.location}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {item.priority.title}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            {item.recommendation?.reasoning}
          </p>
        </div>

        <Badge tone="info">
          {item.priority.priorityScore} Priority Score
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Root Causes" items={item.rootCauses} />
        <Panel title="Trends" items={item.trends} />
        <MemoryPanel
          summary={item.memorySummary}
          count={item.memory ? 1 : 0}
        />
      </div>
    </Card>
  );
}

function Panel({ title, items = [] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <h4 className="font-semibold text-white">{title}</h4>

      {items.length > 0 ? (
        <div className="mt-3 space-y-3">
          {items.map((item) => (
            <div key={item.id}>
              <p className="text-sm font-semibold text-slate-300">
                {item.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500">
          No intelligence available yet.
        </p>
      )}
    </div>
  );
}

function MemoryPanel({ summary, count }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <h4 className="font-semibold text-white">Operational Memory</h4>

      <p className="mt-3 text-sm leading-6 text-slate-400">{summary}</p>

      {count > 0 && (
        <p className="mt-3 text-xs text-slate-500">
          Based on {count} previous matched intervention
          {count === 1 ? "" : "s"}.
        </p>
      )}
    </div>
  );
}