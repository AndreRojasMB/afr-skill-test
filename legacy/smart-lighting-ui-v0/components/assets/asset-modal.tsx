'use client';

import { useState } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface AssetModalProps {
  asset: Asset | null;
  isOpen: boolean;
  mode: 'view' | 'edit' | 'delete';
  onClose: () => void;
  onSave?: (asset: Asset) => void;
  onDelete?: (assetId: string) => void;
}

export function AssetModal({
  asset,
  isOpen,
  mode,
  onClose,
  onSave,
  onDelete,
}: AssetModalProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const [formData, setFormData] = useState<Asset>(asset || {
    id: '',
    name: '',
    location: '',
    type: 'LED',
    power: 0,
    status: 'active',
    lastUpdate: '',
    consumption: 0,
  });

  if (!isOpen || !asset) return null;

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(t('assets.deleteConfirm'))) {
      onDelete(asset.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {mode === 'view' ? t('assets.viewDetails') : mode === 'edit' ? t('assets.editLuminaire') : 'Delete Luminaire'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {mode === 'delete' ? (
            <div className="text-center space-y-4">
              <p className="text-foreground text-lg font-medium">{t('assets.deleteConfirm')}</p>
              <p className="text-muted-foreground text-sm">{asset.name} ({asset.id})</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('assets.id')}
                  </label>
                  <Input
                    value={formData.id}
                    disabled
                    className="bg-secondary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('assets.name')}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={mode === 'view'}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t('assets.location')}
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={mode === 'view'}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('assets.type')}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="LED">LED</option>
                    <option value="Sodium">Sodium</option>
                    <option value="Mercury">Mercury</option>
                    <option value="Solar">Solar</option>
                    <option value="Fluorescent">Fluorescent</option>
                    <option value="MetalHalide">Metal Halide</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('assets.power')}
                  </label>
                  <Input
                    type="number"
                    value={formData.power}
                    onChange={(e) => setFormData({ ...formData, power: Number(e.target.value) })}
                    disabled={mode === 'view'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('assets.status')}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="active">Active</option>
                    <option value="faulty">Faulty</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('fieldData.engineer')}
                  </label>
                  <Input
                    value={formData.engineer || ''}
                    onChange={(e) => setFormData({ ...formData, engineer: e.target.value })}
                    disabled={mode === 'view'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('fieldData.poleHeight')}
                  </label>
                  <Input
                    type="number"
                    value={formData.poleHeight || ''}
                    onChange={(e) => setFormData({ ...formData, poleHeight: Number(e.target.value) })}
                    disabled={mode === 'view'}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {t('common.cancel')}
          </Button>
          {mode === 'delete' && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          )}
          {mode === 'edit' && (
            <Button
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {t('common.save')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
