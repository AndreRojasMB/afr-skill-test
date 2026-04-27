import { Lightbulb, Zap, Leaf, TrendingUp, AlertCircle, MapPin } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { StatusOverview } from '@/components/dashboard/status-overview';
import { EnergyChart } from '@/components/dashboard/energy-chart';
import { CarbonChart } from '@/components/dashboard/carbon-chart';
import { Button } from '@/components/ui/button';

const alerts = [
  {
    id: '1',
    title: 'Power Surge Detected',
    description: 'Zone 7 - Street A shows unusual power consumption spike',
    type: 'critical' as const,
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    title: 'Maintenance Due',
    description: '23 luminaires require scheduled maintenance this week',
    type: 'warning' as const,
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    title: 'System Update',
    description: 'Firmware update available for 156 compatible devices',
    type: 'info' as const,
    timestamp: '3 hours ago',
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your lighting infrastructure</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Luminaires"
            value="3070"
            icon={<Lightbulb className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            variant="default"
          />
          <KPICard
            title="Active"
            value="2847"
            unit="units"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 2, isPositive: true }}
            variant="success"
          />
          <KPICard
            title="Energy Today"
            value="18.4"
            unit="kWh"
            icon={<Zap className="w-6 h-6" />}
            trend={{ value: 8, isPositive: false }}
            variant="default"
          />
          <KPICard
            title="CO₂ Emissions"
            value="243"
            unit="tons/mo"
            icon={<Leaf className="w-6 h-6" />}
            trend={{ value: 14, isPositive: true }}
            variant="accent"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button className="gap-2">
            <Lightbulb className="w-4 h-4" />
            Add Luminaire
          </Button>
          <Button variant="outline" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            View Alerts
          </Button>
          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            View Map
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <StatusOverview />
            <EnergyChart />
          </div>

          {/* Right Column - Alerts */}
          <div className="space-y-6">
            <AlertsPanel alerts={alerts} />
            <CarbonChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CO₂ Reduction Info */}
          <div className="bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Environmental Impact
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CO₂ Saved vs Traditional</span>
                <span className="font-bold text-accent">578 tons/month</span>
              </div>
              <div className="w-full bg-background/50 rounded-full h-2">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: '72%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Equivalent to: 125 cars off the road monthly
              </p>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gradient-to-br from-primary/20 to-background/10 border border-primary/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">System Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Overall Status</span>
                <span className="font-bold text-primary">92.7%</span>
              </div>
              <div className="w-full bg-background/50 rounded-full h-2">
                <div className="h-full bg-primary rounded-full" style={{ width: '92.7%' }} />
              </div>
              <p className="text-xs text-muted-foreground">
                89 faulty devices | 134 in maintenance
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
