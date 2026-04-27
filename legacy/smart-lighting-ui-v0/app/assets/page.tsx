'use client';

import { useState } from 'react';
import { Plus, FileText, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssetTable } from '@/components/assets/asset-table';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import { exportToCSV, exportToJSON, exportToXML } from '@/lib/export-utils';

export default function AssetsPage() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Mock data for export
  const mockAssets = [
    { id: 'LUM-001', name: 'Main Street - Corner 1', location: '40.7128° N, 74.0060° W', type: 'LED', power: 150, status: 'active' },
    { id: 'LUM-002', name: 'Park Avenue - Junction', location: '40.7614° N, 73.9776° W', type: 'LED', power: 200, status: 'active' },
  ];

  const handleExport = (format: 'csv' | 'json' | 'xml') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `luminaires-${timestamp}.${format}`;

    if (format === 'csv') {
      exportToCSV(mockAssets, filename);
    } else if (format === 'json') {
      exportToJSON(mockAssets, filename);
    } else {
      exportToXML(mockAssets, filename, 'luminaires');
    }
    setShowExportMenu(false);
  };

  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('assets.title')}</h1>
            <p className="text-muted-foreground">{t('assets.title')} - AFR Energia</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="w-4 h-4" />
                {t('common.export')}
                <ChevronDown className="w-4 h-4" />
              </Button>
              {showExportMenu && (
                <div className="absolute top-12 right-0 bg-card border border-border rounded-lg shadow-lg p-2 z-10">
                  <button
                    onClick={() => handleExport('csv')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                  >
                    {t('reports.exportCSV')}
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                  >
                    JSON
                  </button>
                  <button
                    onClick={() => handleExport('xml')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                  >
                    XML
                  </button>
                </div>
              )}
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t('assets.addNew')}
            </Button>
          </div>
        </div>

        {/* Asset Table */}
        <AssetTable />
      </div>
    </main>
  );
}
