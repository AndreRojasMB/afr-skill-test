'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Leaf, TrendingDown } from 'lucide-react';

const data = [
  { name: 'LED (Low Emissions)', value: 65, color: '#10b981' },
  { name: 'Sodium Vapor', value: 20, color: '#f59e0b' },
  { name: 'Mercury (Legacy)', value: 15, color: '#ef4444' },
];

export function CarbonChart() {
  const totalEmissions = 243;
  const savedCO2 = 578;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <Leaf className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">CO₂ Emissions by Type</h3>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${entry.value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
            formatter={(value) => `${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-background/50 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total CO₂</p>
          <p className="text-2xl font-bold text-foreground">{totalEmissions}</p>
          <p className="text-xs text-muted-foreground mt-1">tons/month</p>
        </div>
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">CO₂ Saved</p>
          </div>
          <p className="text-2xl font-bold text-accent">{savedCO2}</p>
          <p className="text-xs text-muted-foreground mt-1">vs traditional</p>
        </div>
      </div>
    </div>
  );
}
