export default function WorkspaceSection({
  label,
  title,
  description,
  children,
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {label}
          </p>
        )}

        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="max-w-3xl text-slate-400">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}