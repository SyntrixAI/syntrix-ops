import Card from "../ui/Card";

export default function ImpactCard({ amount, period }) {
  return (
    <Card>
      <p className="text-xl font-bold text-white">
        Potential Impact
      </p>

      <h2 className="mt-6 text-6xl font-bold text-cyan-400">
        {amount}
      </h2>

      <p className="mt-2 text-2xl font-bold text-white">
        {period}
      </p>
    </Card>
  );
}