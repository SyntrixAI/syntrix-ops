import AppLayout from "../../components/layout/AppLayout";
import LiveIntelligence from "../../components/intelligence/LiveIntelligence";
import SignalFeed from "../../components/intelligence/SignalFeed";

import { intelligenceBrief } from "../../data/intelligenceBrief";
import { signals } from "../../data/signals";
import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";

export default function IntelligencePage() {
  return (
    <AppLayout>
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-cyan-400">
          SYNTRIX INTELLIGENCE
        </p>

        <h1 className="mt-4 text-5xl font-bold text-white">
          What is Syntrix seeing right now?
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Syntrix observes operational signals, explains business impact, and
          recommends the next best decision.
        </p>

        <LiveIntelligence
          intelligenceBrief={intelligenceBrief}
          priorities={priorities}
          executionItems={executionItems}
        />

        <div className="mt-8">
          <SignalFeed signals={signals} />
        </div>
      </section>
    </AppLayout>
  );
}