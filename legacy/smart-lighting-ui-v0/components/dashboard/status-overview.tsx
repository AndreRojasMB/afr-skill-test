'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertCircle, Wrench } from 'lucide-react';

const data = [
  { name: 'Active', value: 2847, icon: Activity, color: '#10b981' },
  { name: 'Faulty', value: 89, icon: AlertCircle, color: '#ef4444' },
  { name: 'Maintenance', value: 134, icon: Wrench, color: '#f59e0b' },
];

export function StatusOverview() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Luminaire Status</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {data.map((item) => {
          const Icon = item.icon;
          const percentage = ((item.value / total) * 100).toFixed(1);

          return (
            <div
              key={item.name}
              className="p-4 rounded-lg border border-border/50 bg-background/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{percentage}% of total</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
          <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
