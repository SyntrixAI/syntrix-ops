import Card from "../ui/Card";

export default function AskSyntrixPanel() {
  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">
        Ask Syntrix Intelligence
      </p>

      <h2 className="mt-3 text-2xl font-bold text-white">
        Natural-language intelligence is coming soon.
      </h2>

      <p className="mt-3 max-w-3xl text-slate-400">
        Soon, leaders will be able to ask Syntrix direct operational questions.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {[
          "Why is Plano declining?",
          "What changed overnight?",
          "Where is the biggest recovery opportunity?",
          "What should I focus on today?",
        ].map((question) => (
          <div
            key={question}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            {question}
          </div>
        ))}
      </div>
    </Card>
  );
}