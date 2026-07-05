"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ navigation = [] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex min-h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 p-6">
      <div>
        <h1 className="text-5xl font-bold text-white">Syntrix</h1>

        <p className="mt-2 text-sm text-slate-500">
          Operational Decision Platform
        </p>
      </div>

      <nav className="mt-12 flex-1 space-y-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <p className="mb-3 px-3 text-xs font-bold tracking-[0.2em] text-slate-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
                      active
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 pt-6">
        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            System
          </p>

          <p className="mt-2 text-sm text-green-400">
            ● All Systems Operational
          </p>
        </div>
      </div>
    </aside>
  );
}