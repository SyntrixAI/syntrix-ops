const locations = [
  {
    name: "Dallas North",
    revenue: 18420,
    labor: 27.8,
    foodCost: 30.9,
    primeCost: 58.7,
    profit: 3820,
    healthScore: 94,
  },
  {
    name: "Plano",
    revenue: 16250,
    labor: 29.4,
    foodCost: 31.8,
    primeCost: 61.2,
    profit: 2950,
    healthScore: 86,
  },
  {
    name: "Houston",
    revenue: 14580,
    labor: 33.1,
    foodCost: 34.5,
    primeCost: 67.6,
    profit: 1650,
    healthScore: 72,
  },
  {
    name: "Austin South",
    revenue: 12890,
    labor: 35.2,
    foodCost: 36.7,
    primeCost: 71.9,
    profit: 820,
    healthScore: 58,
  },
];

const totalRevenue = locations.reduce((sum, store) => sum + store.revenue, 0);
const totalProfit = locations.reduce((sum, store) => sum + store.profit, 0);
const averageHealth =
  locations.reduce((sum, store) => sum + store.healthScore, 0) /
  locations.length;

const leastProfitableStore = locations.reduce((lowest, store) =>
  store.profit < lowest.profit ? store : lowest
);

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm text-cyan-400 font-semibold">SYNTRIX OPS</p>

        <h1 className="text-5xl font-bold mt-4">
          Multi-Location Operations Intelligence
        </h1>

        <p className="text-slate-300 mt-4 max-w-3xl">
          Track company-wide performance, rank every location, and identify
          which stores need attention before problems become expensive.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Company Revenue</p>
            <h2 className="text-3xl font-bold mt-2">
              {formatCurrency(totalRevenue)}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Company Profit</p>
            <h2 className="text-3xl font-bold mt-2">
              {formatCurrency(totalProfit)}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Average Health</p>
            <h2 className="text-3xl font-bold mt-2">
              {averageHealth.toFixed(0)}/100
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-red-900">
            <p className="text-slate-400">Needs Attention</p>
            <h2 className="text-3xl font-bold mt-2 text-red-400">
              {leastProfitableStore.name}
            </h2>
          </div>
        </div>

        <div className="mt-10 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold">Location Rankings</h2>

          <div className="mt-6 space-y-4">
            {[...locations]
              .sort((a, b) => b.healthScore - a.healthScore)
              .map((store, index) => (
                <div
                  key={store.name}
                  className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800"
                >
                  <div>
                    <p className="text-slate-400">#{index + 1}</p>
                    <h3 className="text-xl font-semibold">{store.name}</h3>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-400">Health Score</p>
                    <p className="text-2xl font-bold">{store.healthScore}/100</p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-400">Profit</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(store.profit)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-10 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold">AI Executive Summary</h2>
          <p className="text-slate-300 mt-3">
            Austin South is currently the lowest-performing location, with the
            weakest health score and lowest profit. Labor and food cost are both
            above target, creating a prime cost of 71.9%. Recommend reviewing
            staffing levels, protein usage, and purchasing controls this week.
          </p>
        </div>
      </section>
    </main>
  );
}
