import Card from "../../ui/Card";

export default function WorkspaceHeader({
  eyebrow,
  title,
  decision,
  updatedAt,
}) {
  return (
    <Card>
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          {eyebrow}
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white">
          {title}
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-300">
          {decision}
        </p>

        <p className="text-sm text-slate-500">
          {updatedAt}
        </p>
      </div>
    </Card>
  );
}