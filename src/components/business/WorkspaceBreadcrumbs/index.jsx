import Link from "next/link";

export default function WorkspaceBreadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span className="text-slate-600">/</span>}

          {item.href ? (
            <Link href={item.href} className="hover:text-cyan-400">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}