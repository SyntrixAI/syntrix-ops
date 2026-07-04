import Card from "../ui/Card";
import SignalItem from "./SignalItem";

export default function SignalFeed({ signals }) {
  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Live Intelligence
      </p>

      <div className="mt-6 space-y-4">
        {signals.map((signal) => (
          <SignalItem
            key={signal.id}
            signal={signal}
          />
        ))}
      </div>
    </Card>
  );
}