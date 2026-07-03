import Card from "../ui/Card";

export default function EvidenceList({ evidence }) {
  return (
    <Card className="mt-8">
      <p className="font-semibold text-cyan-400">Supporting Evidence</p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        Why Syntrix believes this
      </h3>

      <div className="mt-6 space-y-3">
        {evidence.map((item) => (
          <div key={item} className="flex items-center gap-3 text-slate-300">
            <span className="text-green-400">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}