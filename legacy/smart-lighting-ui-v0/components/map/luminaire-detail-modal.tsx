'use client';

import { X, Eye, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

interface Luminaire {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'active' | 'faulty' | 'maintenance';
  type: string;
  power: number;
  municipality?: string;
  lastUpdate?: string;
}

interface LuminaireDetailModalProps {
  luminaire: Luminaire | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (luminaire: Luminaire) => void;
  onDelete?: (id: string) => void;
  onReportIssue?: (id: string) => void;
}

export function LuminaireDetailModal({
  luminaire,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onReportIssue,
}: LuminaireDetailModalProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  if (!isOpen || !luminaire) return null;

  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    faulty: 'bg-red-500/20 text-red-600 dark:text-red-400',
    maintenance: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">{luminaire.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* ID and Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{luminaire.id}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[luminaire.status]}`}>
              {luminaire.status.charAt(0).toUpperCase() + luminaire.status.slice(1)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="space-y-3 bg-background/50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">{luminaire.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Power</span>
              <span className="font-medium">{luminaire.power}W</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium text-xs">{luminaire.lat.toFixed(4)}°, {luminaire.lng.toFixed(4)}°</span>
            </div>
            {luminaire.municipality && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Municipality</span>
                <span className="font-medium">{luminaire.municipality}</span>
              </div>
            )}
            {luminaire.lastUpdate && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Update</span>
                <span className="font-medium">{luminaire.lastUpdate}</span>
              </div>
            )}
          </div>

          {/* Alert for faulty */}
          {luminaire.status === 'faulty' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 dark:text-red-400">This luminaire requires maintenance</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 p-6 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 flex-1"
            onClick={onClose}
          >
            {t('common.close')}
          </Button>
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => onEdit(luminaire)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
          {onReportIssue && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-yellow-600 hover:text-yellow-700"
              onClick={() => onReportIssue(luminaire.id)}
            >
              <AlertTriangle className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive/80"
              onClick={() => onDelete(luminaire.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
