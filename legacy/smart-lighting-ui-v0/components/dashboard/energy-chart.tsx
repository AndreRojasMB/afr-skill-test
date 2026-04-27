'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Zap } from 'lucide-react';

const data = [
  { time: '12 AM', consumption: 1200 },
  { time: '4 AM', consumption: 950 },
  { time: '8 AM', consumption: 2100 },
  { time: '12 PM', consumption: 2800 },
  { time: '4 PM', consumption: 3200 },
  { time: '8 PM', consumption: 3500 },
  { time: '12 AM', consumption: 2400 },
];

export function EnergyChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Energy Consumption</h3>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="time"
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
            formatter={(value) => `${value} kWh`}
          />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="var(--color-primary)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-background/50 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Today</p>
          <p className="text-2xl font-bold text-foreground">18.4 kWh</p>
        </div>
        <div className="p-4 rounded-lg bg-background/50 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Avg Hourly</p>
          <p className="text-2xl font-bold text-foreground">2.3 kWh</p>
        </div>
      </div>
    </div>
  );
}
