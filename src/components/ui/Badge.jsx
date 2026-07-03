export default function Badge({ children, tone = "default" }) {
  const tones = {
    default: "bg-slate-500/10 text-slate-300",
    success: "bg-green-500/10 text-green-400",
    warning: "bg-yellow-500/10 text-yellow-400",
    danger: "bg-red-500/10 text-red-400",
    info: "bg-cyan-500/10 text-cyan-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}