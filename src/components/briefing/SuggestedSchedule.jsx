import Card from "../ui/Card";

export default function SuggestedSchedule({ schedule }) {
  return (
    <Card className="mt-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Suggested Schedule
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        How to spend your day
      </h2>

      <div className="mt-6 space-y-6">
        {schedule.map((item) => (
          <div key={item.time} className="border-l border-cyan-500/40 pl-5">
            <p className="text-lg font-bold text-white">{item.time}</p>
            <p className="mt-1 text-slate-300">{item.task}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}