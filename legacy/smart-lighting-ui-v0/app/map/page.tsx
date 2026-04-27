'use client';

import { useState } from 'react';
import { Map, Activity, AlertCircle, Wrench, Search, Filter, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Luminaire {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'active' | 'faulty' | 'maintenance';
  type: string;
  power: number;
}

const mockLuminaires: Luminaire[] = [
  {
    id: 'LUM-001',
    name: 'Main Street - Corner 1',
    lat: 40.7128,
    lng: -74.006,
    status: 'active',
    type: 'LED',
    power: 150,
  },
  {
    id: 'LUM-002',
    name: 'Park Avenue - Junction',
    lat: 40.7614,
    lng: -73.9776,
    status: 'active',
    type: 'LED',
    power: 200,
  },
  {
    id: 'LUM-003',
    name: 'Broadway - Zone B',
    lat: 40.7505,
    lng: -73.9972,
    status: 'faulty',
    type: 'Sodium',
    power: 250,
  },
  {
    id: 'LUM-004',
    name: 'Central Park - North',
    lat: 40.7829,
    lng: -73.9654,
    status: 'maintenance',
    type: 'LED',
    power: 120,
  },
  {
    id: 'LUM-005',
    name: 'East Side - Block 5',
    lat: 40.7489,
    lng: -73.968,
    status: 'active',
    type: 'Mercury',
    power: 400,
  },
];

const statusIcons = {
  active: { icon: Activity, color: 'bg-emerald-500' },
  faulty: { icon: AlertCircle, color: 'bg-red-500' },
  maintenance: { icon: Wrench, color: 'bg-yellow-500' },
};

export default function MapPage() {
  const [selectedLuminaire, setSelectedLuminaire] = useState<Luminaire | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | Luminaire['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(13);

  const filteredLuminaires = mockLuminaires.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockLuminaires.length,
    active: mockLuminaires.filter((l) => l.status === 'active').length,
    faulty: mockLuminaires.filter((l) => l.status === 'faulty').length,
    maintenance: mockLuminaires.filter((l) => l.status === 'maintenance').length,
  };

  return (
    <main className="min-h-screen bg-background lg:ml-64 flex flex-col">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Map className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Map View</h1>
            </div>
            <p className="text-sm text-muted-foreground">Luminaire network overview</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground mb-1">Total</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Active</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.active}
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Faulty</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.faulty}</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.maintenance}
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search luminaires..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              {(['all', 'active', 'faulty', 'maintenance'] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize text-xs"
                >
                  {status === 'all' ? 'All' : status}
                </Button>
              ))}
            </div>
          </div>

          {/* Luminaire List */}
          <div className="bg-card rounded-lg border border-border p-4 space-y-2 max-h-96 overflow-y-auto">
            {filteredLuminaires.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No luminaires found</p>
            ) : (
              filteredLuminaires.map((lum) => {
                const StatusIcon = statusIcons[lum.status].icon;
                return (
                  <button
                    key={lum.id}
                    onClick={() => setSelectedLuminaire(lum)}
                    className={cn(
                      'w-full p-3 rounded-lg border transition-all text-left',
                      selectedLuminaire?.id === lum.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-border',
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full mt-1 flex-shrink-0',
                          statusIcons[lum.status].color,
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{lum.name}</p>
                        <p className="text-xs text-muted-foreground">{lum.id}</p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Legend */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Legend</h3>
            <div className="space-y-2">
              {(['active', 'faulty', 'maintenance'] as const).map((status) => {
                const StatusIcon = statusIcons[status].icon;
                const labels = {
                  active: 'Active',
                  faulty: 'Faulty',
                  maintenance: 'Maintenance',
                };
                return (
                  <div key={status} className="flex items-center gap-2 text-xs">
                    <div className={cn('w-3 h-3 rounded-full', statusIcons[status].color)} />
                    <span className="text-muted-foreground">{labels[status]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Map Area */}
        <div className="flex-1 rounded-xl border border-border overflow-hidden flex flex-col">
          {/* Map Container */}
          <div className="flex-1 bg-gradient-to-b from-background to-background/80 relative flex items-center justify-center">
            {/* Placeholder Map */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Luminaire Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {filteredLuminaires.map((lum) => {
                const StatusIcon = statusIcons[lum.status].icon;
                const isSelected = selectedLuminaire?.id === lum.id;
                const xPos = 50 + (lum.lng + 74.008) * 10;
                const yPos = 50 - (lum.lat - 40.745) * 15;

                return (
                  <button
                    key={lum.id}
                    onClick={() => setSelectedLuminaire(lum)}
                    style={{
                      left: `${Math.max(5, Math.min(95, xPos))}%`,
                      top: `${Math.max(5, Math.min(95, yPos))}%`,
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  >
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center transition-all relative',
                        statusIcons[lum.status].color,
                        isSelected ? 'ring-2 ring-offset-2 ring-primary scale-125' : 'hover:scale-110',
                      )}
                    >
                      <StatusIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute left-8 top-0 bg-card border border-border rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <p className="text-xs font-medium text-foreground">{lum.id}</p>
                      <p className="text-xs text-muted-foreground">{lum.name.substring(0, 15)}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoomLevel(Math.min(20, zoomLevel + 1))}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoomLevel(Math.max(5, zoomLevel - 1))}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-6 h-6 border-2 border-primary/50 rounded-full" />
            </div>
          </div>

          {/* Selected Luminaire Details */}
          {selectedLuminaire && (
            <div className="border-t border-border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{selectedLuminaire.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{selectedLuminaire.id}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground">{selectedLuminaire.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Power</p>
                      <p className="font-medium text-foreground">{selectedLuminaire.power}W</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium text-foreground capitalize">{selectedLuminaire.status}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Coordinates</p>
                      <p className="font-medium text-foreground text-xs">
                        {selectedLuminaire.lat.toFixed(4)}°, {selectedLuminaire.lng.toFixed(4)}°
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
