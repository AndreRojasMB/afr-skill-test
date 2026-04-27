import { Smartphone, Zap } from 'lucide-react';
import { FieldDataForm } from '@/components/field/field-data-form';

export default function FieldDataPage() {
  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Field Data Collection</h1>
          </div>
          <p className="text-muted-foreground">
            Register new luminaires or update existing ones with GPS-tagged photos
          </p>
        </div>

        {/* Mobile Optimized Note */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex gap-3">
          <Zap className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Mobile-First Design</p>
            <p className="text-xs text-muted-foreground mt-1">
              Optimized for field technicians. Offline storage supported - sync when connection available.
            </p>
          </div>
        </div>

        {/* Form */}
        <FieldDataForm />
      </div>
    </main>
  );
}
