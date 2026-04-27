import { statusTone, labelize } from "@/lib/demo-data";

export function StatusBadge({ value }: { value: string }) {
  return <span className={`badge ${statusTone(value)}`}>{labelize(value)}</span>;
}
