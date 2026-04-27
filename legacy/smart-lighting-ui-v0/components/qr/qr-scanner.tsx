'use client';

import { useState } from 'react';
import { Camera, AlertCircle, Lightbulb, MapPin, Zap, Edit2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ScannedAsset {
  id: string;
  name: string;
  location: string;
  type: string;
  power: number;
  status: 'active' | 'faulty' | 'maintenance';
  consumption: number;
}

const mockAssetData: Record<string, ScannedAsset> = {
  'LUM-001': {
    id: 'LUM-001',
    name: 'Main Street - Corner 1',
    location: '40.7128° N, 74.0060° W',
    type: 'LED',
    power: 150,
    status: 'active',
    consumption: 18,
  },
  'LUM-002': {
    id: 'LUM-002',
    name: 'Park Avenue - Junction',
    location: '40.7614° N, 73.9776° W',
    type: 'LED',
    power: 200,
    status: 'active',
    consumption: 24,
  },
  'LUM-003': {
    id: 'LUM-003',
    name: 'Broadway - Zone B',
    location: '40.7505° N, 73.9972° W',
    type: 'Sodium',
    power: 250,
    status: 'faulty',
    consumption: 28,
  },
};

const statusConfig = {
  active: { color: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400', label: 'Active' },
  faulty: { color: 'bg-red-500/20 text-red-600 dark:text-red-400', label: 'Faulty' },
  maintenance: { color: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400', label: 'Maintenance' },
};

export function QRScanner() {
  const [mode, setMode] = useState<'scan' | 'manual' | 'result'>('scan');
  const [manualInput, setManualInput] = useState('');
  const [scannedAsset, setScannedAsset] = useState<ScannedAsset | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleScan = () => {
    // Simulate QR code scan
    const qrCode = 'LUM-001';
    const asset = mockAssetData[qrCode];
    if (asset) {
      setScannedAsset(asset);
      setMode('result');
    }
  };

  const handleManualInput = () => {
    const asset = mockAssetData[manualInput.toUpperCase()];
    if (asset) {
      setScannedAsset(asset);
      setMode('result');
      setManualInput('');
    }
  };

  const handleEdit = (field: string, value: string) => {
    if (scannedAsset) {
      setScannedAsset({
        ...scannedAsset,
        [field]: field === 'power' || field === 'consumption' ? parseInt(value) : value,
      });
      setEditingField(null);
    }
  };

  const resetScanner = () => {
    setMode('scan');
    setScannedAsset(null);
    setManualInput('');
    setEditingField(null);
  };

  return (
    <div className="max-w-2xl">
      {/* Mode Tabs */}
      <div className="flex gap-3 mb-6">
        {[
          { id: 'scan', label: 'Scan QR', icon: Camera },
          { id: 'manual', label: 'Manual Input', icon: Lightbulb },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as 'scan' | 'manual')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                mode === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:bg-background/50',
              )}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Scan Mode */}
      {mode === 'scan' && !scannedAsset && (
        <div className="bg-card rounded-xl border border-border p-12 space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-dashed border-primary flex items-center justify-center">
              <Camera className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scan QR Code</h3>
            <p className="text-muted-foreground">
              Point your device camera at a luminaire QR code to instantly access its details
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground">
              Camera permissions required. Make sure your device's camera is accessible.
            </p>
          </div>

          <Button onClick={handleScan} className="w-full gap-2" size="lg">
            <Camera className="w-5 h-5" />
            Start Camera
          </Button>
        </div>
      )}

      {/* Manual Input Mode */}
      {mode === 'manual' && !scannedAsset && (
        <div className="bg-card rounded-xl border border-border p-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-6">Enter Asset ID</h3>
          <div className="space-y-4">
            <Input
              placeholder="e.g., LUM-001, LUM-002, LUM-003"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleManualInput();
                }
              }}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              Tip: Try LUM-001, LUM-002, or LUM-003
            </p>
            <Button onClick={handleManualInput} className="w-full" size="lg">
              Search Asset
            </Button>
          </div>
        </div>
      )}

      {/* Result Mode */}
      {mode === 'result' && scannedAsset && (
        <div className="space-y-6">
          {/* Success Banner */}
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Asset found! Review or update details below.
            </p>
          </div>

          {/* Asset Details */}
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Asset Details</h3>
              <div className="space-y-4">
                {/* Asset ID */}
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Asset ID</span>
                  </div>
                  <span className="font-mono font-semibold text-foreground">{scannedAsset.id}</span>
                </div>

                {/* Name */}
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingField('name');
                        setEditValue(scannedAsset.name);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {editingField === 'name' ? (
                    <div className="flex gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        onClick={() => handleEdit('name', editValue)}
                        variant="outline"
                        size="sm"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <p className="text-foreground">{scannedAsset.name}</p>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-start justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-start gap-2 flex-1">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="text-foreground">{scannedAsset.location}</p>
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">Type</p>
                    <p className="font-semibold text-foreground">{scannedAsset.type}</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">Power</p>
                    <p className="font-semibold text-foreground">{scannedAsset.power}W</p>
                  </div>
                </div>

                {/* Status */}
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <div className={cn('inline-block px-3 py-1 rounded-full text-sm font-medium', statusConfig[scannedAsset.status].color)}>
                    {statusConfig[scannedAsset.status].label}
                  </div>
                </div>

                {/* Energy Consumption */}
                <div className="p-4 bg-background/50 rounded-lg border border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Current Consumption</span>
                  </div>
                  <span className="font-semibold text-foreground">{scannedAsset.consumption} kWh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={resetScanner} className="flex-1">
              Scan Another
            </Button>
            <Button className="flex-1 gap-2">
              <Edit2 className="w-4 h-4" />
              Open Full Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
