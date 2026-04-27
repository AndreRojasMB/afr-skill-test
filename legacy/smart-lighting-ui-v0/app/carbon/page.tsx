'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Leaf, TrendingDown, TreePine, Car, Home } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import { Button } from '@/components/ui/button';

const emissionsTrend = [
  { month: 'Jan', traditional: 420, led: 118 },
  { month: 'Feb', traditional: 410, led: 115 },
  { month: 'Mar', traditional: 425, led: 120 },
  { month: 'Apr', traditional: 430, led: 125 },
  { month: 'May', traditional: 440, led: 130 },
  { month: 'Jun', traditional: 450, led: 135 },
];

const emissionsByType = [
  { name: 'LED', value: 35, color: '#10b981' },
  { name: 'Sodium', value: 45, color: '#f59e0b' },
  { name: 'Mercury', value: 20, color: '#ef4444' },
];

export default function CarbonPage() {
  const totalEmissions = 243;
  const emissionsReduced = 578;
  const treesEquivalent = Math.round(emissionsReduced / 21); // 1 tree = 21kg CO2/year average
  const carsOffRoad = Math.round(emissionsReduced / 4.6); // Average car = 4.6 tons CO2/year

  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent/20">
            <Leaf className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Carbon Footprint Analytics</h1>
            <p className="text-muted-foreground">
              Monitor and reduce CO₂ emissions from your lighting infrastructure
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Emissions"
            value={totalEmissions}
            unit="tons/month"
            icon={<Leaf className="w-6 h-6" />}
            variant="default"
          />
          <KPICard
            title="Emissions Saved"
            value={emissionsReduced}
            unit="tons/month"
            icon={<TrendingDown className="w-6 h-6" />}
            variant="accent"
            trend={{ value: 14, isPositive: true }}
          />
          <KPICard
            title="Trees Equivalent"
            value={treesEquivalent}
            unit="trees"
            icon={<TreePine className="w-6 h-6" />}
            variant="success"
          />
          <KPICard
            title="Cars Offset"
            value={carsOffRoad}
            unit="vehicles"
            icon={<Car className="w-6 h-6" />}
            variant="accent"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emissions Trend */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Monthly Emissions Comparison
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emissionsTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="traditional" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="led" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Emissions by Type */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Emissions by Luminaire Type
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={emissionsByType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - Distribution & Actions */}
          <div className="space-y-6">
            {/* Distribution Pie */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Total Emissions Split
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={emissionsByType}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {emissionsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {emissionsByType.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <Button className="w-full" size="lg">
              Generate Report
            </Button>
          </div>
        </div>

        {/* Bottom Section - Impact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TreePine,
              title: 'Trees Planted',
              value: treesEquivalent,
              description: 'Equivalent carbon offset',
            },
            {
              icon: Car,
              title: 'Cars Off Road',
              value: carsOffRoad,
              description: 'Monthly equivalent',
            },
            {
              icon: Home,
              title: 'Homes Powered',
              value: Math.round(emissionsReduced / 5),
              description: 'Clean energy equivalent',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30 rounded-xl p-6"
              >
                <Icon className="w-8 h-8 text-accent mb-3" />
                <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm font-semibold text-accent mt-2">{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* Environmental Context */}
        <div className="bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Environmental Impact Summary
          </h3>
          <p className="text-foreground mb-4">
            By upgrading your lighting infrastructure to LED and renewable energy sources, your
            municipality is making a significant environmental impact. Every month, you're
            preventing the emission of <span className="font-bold">{emissionsReduced} tons of CO₂</span> compared to traditional
            lighting systems.
          </p>
          <p className="text-muted-foreground">
            This is equivalent to taking {carsOffRoad} cars off the road or planting {treesEquivalent} trees annually.
            Continue monitoring your carbon footprint to identify opportunities for further
            optimization.
          </p>
        </div>
      </div>
    </main>
  );
}
