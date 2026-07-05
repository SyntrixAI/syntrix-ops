import Link from "next/link";

export default function HierarchyTable({ user, organization }) {
  const rows = getRows(user, organization);

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-slate-800 p-6 text-slate-400">
        No organization units available.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900/70 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Location</th>
            <th className="px-4 py-3 font-semibold text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {rows.map((row) => (
            <tr key={row.id} className="bg-slate-950/40">
              <td className="px-4 py-4 font-semibold text-white">
                {row.name}
              </td>

              <td className="px-4 py-4 text-slate-400">{row.type}</td>

              <td className="px-4 py-4 text-slate-400">{row.location}</td>

              <td className="px-4 py-4 text-right">
                <Link
                  href={row.href}
                  className="font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Open →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getRows(user, organization) {
  if (user.scope.level === "company") {
    return organization.regions.map((region) => ({
      id: region.id,
      name: region.name,
      type: "Region",
      location: "Organization",
      href: `/organization/regions/${region.id}`,
    }));
  }

  if (user.scope.level === "region") {
    return organization.districts.map((district) => ({
      id: district.id,
      name: district.name,
      type: "District",
      location: "Region",
      href: `/districts/${district.id}`,
    }));
  }

  return organization.locations.map((location) => ({
    id: location.id,
    name: location.name,
    type: "Location",
    location: `${location.city}, ${location.state}`,
    href: `/locations/${location.id}`,
  }));
}