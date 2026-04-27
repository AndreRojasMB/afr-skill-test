import { QrCode } from 'lucide-react';
import { QRScanner } from '@/components/qr/qr-scanner';

export default function QRScannerPage() {
  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/20">
              <QrCode className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">QR Code Scanner</h1>
          </div>
          <p className="text-muted-foreground">
            Scan or search for luminaire assets to view and update their information
          </p>
        </div>

        {/* Scanner */}
        <QRScanner />
      </div>
    </main>
  );
}
