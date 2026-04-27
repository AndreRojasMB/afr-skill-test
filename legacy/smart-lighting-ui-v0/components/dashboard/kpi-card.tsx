import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

export function KPICard({
  title,
  value,
  unit,
  icon,
  trend,
  variant = 'default',
}: KPICardProps) {
  const bgVariants = {
    default: 'bg-card border-border',
    accent: 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30',
    success: 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/30',
    warning: 'bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30',
  };

  const iconVariants = {
    default: 'text-primary',
    accent: 'text-accent',
    success: 'text-emerald-500',
    warning: 'text-yellow-500',
  };

  return (
    <div className={cn('p-6 rounded-xl border', bgVariants[variant])}>
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg bg-background/50', iconVariants[variant])}>
          {icon}
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
              trend.isPositive
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'bg-red-500/20 text-red-500',
            )}
          >
            {trend.isPositive ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
