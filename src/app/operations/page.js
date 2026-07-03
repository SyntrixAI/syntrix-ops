import AppLayout from "../../components/layout/AppLayout";

export default function OperationsPage() {
  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-cyan-400">OPERATIONS</p>

        <h1 className="mt-4 text-5xl font-bold text-white">
          Live Operations
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Show me where and what I need to investigate right now.
        </p>
      </section>
    </AppLayout>
  );
}