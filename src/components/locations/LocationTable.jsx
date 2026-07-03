import LocationRow from "./LocationRow";

export default function LocationTable({ locations }) {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="grid grid-cols-7 border-b border-slate-800 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-400">

        <div>Location</div>

        <div>Status</div>

        <div>Health</div>

        <div>Sales vs Forecast</div>

        <div>Prime Cost</div>

        <div>Manager</div>

        <div></div>

      </div>

      {locations.map((location) => (
        <LocationRow
          key={location.id}
          location={location}
        />
      ))}

    </div>
  );
}