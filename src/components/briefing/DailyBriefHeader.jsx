export default function DailyBriefHeader({ name }) {
  return (
    <header>
      <h1 className="text-7xl font-bold tracking-tight text-white">
        Good morning, {name}.
      </h1>

      <p className="mt-2 text-3xl font-bold text-white">
        7:03 AM, Thursday, July 2
      </p>

      <p className="mt-2 text-sm font-semibold text-white">
        <span className="text-green-400">●</span> Monitoring 18 Locations, Last
        Updated: 14 seconds ago
      </p>
    </header>
  );
}