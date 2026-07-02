const navItems = [
  "Daily Briefing",
  "Command Center",
  "Locations",
  "Inventory",
  "Labor",
  "Finance",
  "Reports",
  "AI Copilot",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-6">
      <div>
        <p className="text-xl font-bold text-white">Syntrix</p>
        <p className="mt-1 text-sm text-slate-500">AI Operating System</p>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => (
          <button
            key={item}
            className="w-full rounded-xl px-4 py-3 text-left text-sm text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
