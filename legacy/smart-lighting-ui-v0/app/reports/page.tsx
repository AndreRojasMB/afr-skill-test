'use client';

import { useState } from 'react';
import { FileText, Download, Filter, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'operational',
    name: 'Operational Status',
    description: 'Total luminaires, status breakdown, and maintenance schedule',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 'energy',
    name: 'Energy Consumption',
    description: 'Detailed energy usage by zone, type, and time period',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'carbon',
    name: 'Carbon Footprint',
    description: 'CO₂ emissions analysis and environmental impact metrics',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'maintenance',
    name: 'Maintenance Report',
    description: 'Service history, failed components, and upcoming maintenance',
    icon: <FileText className="w-6 h-6" />,
  },
];

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    zone: '',
  });

  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate and export detailed reports for analysis and compliance
          </p>
        </div>

        {/* Report Templates */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedTemplate === template.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-background/50 text-muted-foreground'
                    }`}
                  >
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Options */}
        {selectedTemplate && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Filter & Configure</h2>

            {/* Filter Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Start Date
                </label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  End Date
                </label>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Zone / District
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                  <option value="">All Zones</option>
                  <option value="zone1">Zone 1</option>
                  <option value="zone2">Zone 2</option>
                  <option value="zone3">Zone 3</option>
                </select>
              </div>
            </div>

            {/* Export Options */}
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Export Format</h3>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2 flex-1">
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
                <Button variant="outline" className="gap-2 flex-1">
                  <Download className="w-4 h-4" />
                  Excel
                </Button>
                <Button variant="outline" className="gap-2 flex-1">
                  <Download className="w-4 h-4" />
                  CSV
                </Button>
              </div>
            </div>

            {/* Generate Button */}
            <Button className="w-full gap-2" size="lg">
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        )}

        {/* Recent Reports */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {[
              {
                name: 'Operational Status Report - March 2026',
                date: 'March 15, 2026',
                format: 'PDF',
              },
              {
                name: 'Energy Consumption Analysis - Q1 2026',
                date: 'March 10, 2026',
                format: 'Excel',
              },
              {
                name: 'Carbon Footprint Report - February 2026',
                date: 'March 1, 2026',
                format: 'PDF',
              },
              {
                name: 'Maintenance Report - March 2026',
                date: 'February 28, 2026',
                format: 'CSV',
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {report.format}
                  </span>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
