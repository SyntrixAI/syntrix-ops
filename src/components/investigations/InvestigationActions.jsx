import Link from "next/link";
import Card from "../ui/Card";

export default function InvestigationActions({ investigation }) {
  const { priority, executionItem } = investigation;

  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">Next Action</p>

      <h2 className="mt-3 text-2xl font-bold text-white">
        {executionItem?.title ?? priority.primaryAction}
      </h2>

      <p className="mt-3 text-slate-400">
        Owner: {executionItem?.owner ?? "Operations Lead"}
      </p>

      <p className="mt-1 text-slate-400">
        Status: {executionItem?.status ?? "Recommended"}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href={`/locations/${priority.locationId}`}
          className="rounded-xl border border-slate-700 px-4 py-3 text-center font-semibold text-white hover:border-cyan-500"
        >
          Open Location
        </Link>

        <button className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
          Send to Execution →
        </button>
      </div>
    </Card>
  );
}