import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  tone: "success" | "warning" | "danger" | "info" | "neutral";
  icon: LucideIcon;
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <p className="metric-label">{label}</p>
        <span className={`badge ${tone}`} aria-hidden="true">
          <Icon size={16} />
        </span>
      </div>
      <strong className="metric-value">{value}</strong>
    </article>
  );
}
