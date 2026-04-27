'use client';

import { useState } from 'react';
import { Activity, AlertCircle, Wrench, Eye, Edit2, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AssetModal } from './asset-modal';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

interface Asset {
  id: string;
  name: string;
  location: string;
  type: 'LED' | 'Sodium' | 'Mercury' | 'Solar' | 'Fluorescent' | 'MetalHalide';
  power: number;
  status: 'active' | 'faulty' | 'maintenance';
  lastUpdate: string;
  consumption: number;
  engineer?: string;
  streetType?: string;
  poleHeight?: number;
}

const mockAssets: Asset[] = [
  {
    id: 'LUM-001',
    name: 'Main Street - Corner 1',
    location: '40.7128° N, 74.0060° W',
    type: 'LED',
    power: 150,
    status: 'active',
    lastUpdate: '5 min ago',
    consumption: 18,
  },
  {
    id: 'LUM-002',
    name: 'Park Avenue - Junction',
    location: '40.7614° N, 73.9776° W',
    type: 'LED',
    power: 200,
    status: 'active',
    lastUpdate: '2 min ago',
    consumption: 24,
  },
  {
    id: 'LUM-003',
    name: 'Broadway - Zone B',
    location: '40.7505° N, 73.9972° W',
    type: 'Sodium',
    power: 250,
    status: 'faulty',
    lastUpdate: '1 hour ago',
    consumption: 28,
  },
  {
    id: 'LUM-004',
    name: 'Central Park - North',
    location: '40.7829° N, 73.9654° W',
    type: 'LED',
    power: 120,
    status: 'maintenance',
    lastUpdate: '3 hours ago',
    consumption: 12,
  },
  {
    id: 'LUM-005',
    name: 'East Side - Block 5',
    location: '40.7489° N, 73.9680° W',
    type: 'Mercury',
    power: 400,
    status: 'active',
    lastUpdate: '10 min ago',
    consumption: 45,
  },
];

const statusConfig = {
  active: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: Activity,
    label: 'Active',
  },
  faulty: {
    bg: 'bg-red-500/20',
    text: 'text-red-600 dark:text-red-400',
    icon: AlertCircle,
    label: 'Faulty',
  },
  maintenance: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: Wrench,
    label: 'Maintenance',
  },
};

export function AssetTable() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Asset['status']>('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState(mockAssets);

  const openModal = (asset: Asset, mode: 'view' | 'edit' | 'delete') => {
    setSelectedAsset(asset);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  const handleSaveAsset = (updatedAsset: Asset) => {
    setAssets(assets.map(a => a.id === updatedAsset.id ? updatedAsset : a));
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter(a => a.id !== assetId));
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, or location..."
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
              className="capitalize"
            >
              {status === 'all' ? 'All' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Name / ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Power (W)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Updated
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAssets.map((asset) => {
              const config = statusConfig[asset.status];
              const StatusIcon = config.icon;

              return (
                <tr key={asset.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">{asset.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{asset.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">{asset.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{asset.power}W</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium', config.bg, config.text)}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{asset.lastUpdate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => openModal(asset, 'view')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => openModal(asset, 'edit')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-destructive"
                        onClick={() => openModal(asset, 'delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAssets.length} of {assets.length} luminaires
      </div>

      {/* Asset Modal */}
      <AssetModal
        asset={selectedAsset}
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={closeModal}
        onSave={handleSaveAsset}
        onDelete={handleDeleteAsset}
      />
    </div>
  );
}
