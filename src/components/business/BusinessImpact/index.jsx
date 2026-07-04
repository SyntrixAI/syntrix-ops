import Card from "../../ui/Card";

export default function BusinessImpact({ weeklyRecovery, annualRecovery }) {
  return (
    <Card className="mt-8">
      <p className="font-semibold text-cyan-400">Business Impact</p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        Estimated Recoverable Profit
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-slate-400">Weekly Recovery</p>
          <p className="mt-2 text-4xl font-bold text-green-400">
            +${weeklyRecovery.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Annual Opportunity</p>
          <p className="mt-2 text-4xl font-bold text-green-400">
            +${annualRecovery.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}