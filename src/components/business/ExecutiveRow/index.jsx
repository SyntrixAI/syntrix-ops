import Link from "next/link";
import Badge from "../../ui/Badge";

export default function ExecutiveRow({
  title,
  subtitle,
  status,
  situation,
  opportunity,
  action,
}) {
  return (
    <div className="grid gap-5 border-b border-slate-800 px-6 py-5 transition hover:bg-slate-800/50 lg:grid-cols-[1.4fr_0.8fr_1.6fr_1fr_0.8fr] lg:items-center">
      <div>
        <p className="font-semibold text-white">{title}</p>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div>
        {status && <Badge tone={getStatusTone(status)}>{status}</Badge>}
      </div>

      <p className="text-sm leading-6 text-slate-300">{situation}</p>

      <p className="font-semibold text-green-400">{opportunity}</p>

      <div className="lg:text-right">
        {action?.href && (
          <Link
            href={action.href}
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            {action.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

function getStatusTone(status) {
  const normalized = String(status).toLowerCase();

  if (normalized === "healthy" || normalized === "complete") return "success";
  if (normalized === "watch" || normalized === "warning") return "warning";
  if (normalized === "critical" || normalized === "at risk") return "danger";

  return "info";
}