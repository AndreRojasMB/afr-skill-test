'use client';

import { useState } from 'react';
import { MapPin, Camera, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

type Step = 'location' | 'asset-info' | 'advanced-info' | 'condition' | 'photos' | 'notes' | 'confirm';

interface FormData {
  latitude: number | null;
  longitude: number | null;
  luminaireType: string;
  power: string;
  status: string;
  zone: string;
  streetName: string;
  notes: string;
  photos: File[];
  engineer: string;
  streetType: string;
  poleHeight: string;
  streetWidth: string;
  polesDistance: string;
  disposition: string;
  quantity: string;
}

export function FieldDataForm() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const [currentStep, setCurrentStep] = useState<Step>('location');
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    latitude: null,
    longitude: null,
    luminaireType: '',
    power: '',
    status: 'active',
    zone: '',
    streetName: '',
    notes: '',
    photos: [],
    engineer: '',
    streetType: '',
    poleHeight: '',
    streetWidth: '',
    polesDistance: '',
    disposition: 'unilateral',
    quantity: '1',
  });
  const [submitted, setSubmitted] = useState(false);

  // Capture geolocation
  const captureLocation = () => {
    setIsGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsGeoLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsGeoLoading(false);
        },
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      setFormData({
        ...formData,
        photos: Array.from(files),
      });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCurrentStep('location');
      setFormData({
        latitude: null,
        longitude: null,
        luminaireType: '',
        power: '',
        status: 'active',
        zone: '',
        streetName: '',
        notes: '',
        photos: [],
        engineer: '',
        streetType: '',
        poleHeight: '',
        streetWidth: '',
        polesDistance: '',
        disposition: 'unilateral',
        quantity: '1',
      });
    }, 2000);
  };

  const steps = [
    { id: 'location', label: t('fieldData.location') },
    { id: 'asset-info', label: t('fieldData.basicInfo') },
    { id: 'advanced-info', label: 'Advanced' },
    { id: 'condition', label: t('fieldData.condition') },
    { id: 'photos', label: t('fieldData.photos') },
    { id: 'notes', label: t('fieldData.notes') },
    { id: 'confirm', label: t('fieldData.review') },
  ];

  return (
    <div className="max-w-2xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex gap-2 mb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.id as Step)}
                disabled={submitted}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background/50 text-muted-foreground border border-border',
                )}
              >
                {index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-1 rounded-full transition-colors',
                    currentStep === steps[index + 1].id || steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                      ? 'bg-primary'
                      : 'bg-border',
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 text-center">
              <p className="text-xs text-muted-foreground">{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-card rounded-xl border border-border p-8">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Luminaire Created Successfully
            </h3>
            <p className="text-muted-foreground">
              QR code generated and asset added to the map
            </p>
          </div>
        ) : (
          <>
            {/* Step: Location */}
            {currentStep === 'location' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Capture Location
                </h3>
                <div className="bg-background/50 rounded-lg p-6 border border-border">
                  <div className="flex flex-col items-center gap-4">
                    <MapPin className="w-12 h-12 text-primary" />
                    {formData.latitude && formData.longitude ? (
                      <>
                        <p className="text-center text-foreground">
                          <span className="font-semibold">Location Captured</span>
                        </p>
                        <div className="text-center space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Latitude: {formData.latitude.toFixed(4)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Longitude: {formData.longitude.toFixed(4)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        {isGeoLoading ? 'Detecting location...' : 'Ready to capture location'}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={captureLocation}
                  disabled={isGeoLoading}
                  className="w-full gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {isGeoLoading ? 'Capturing...' : 'Capture Location'}
                </Button>
              </div>
            )}

            {/* Step: Asset Info */}
            {currentStep === 'asset-info' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Asset Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Luminaire Type
                    </label>
                    <select
                      value={formData.luminaireType}
                      onChange={(e) =>
                        setFormData({ ...formData, luminaireType: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      <option value="">Select type...</option>
                      <option value="LED">LED</option>
                      <option value="Sodium">Sodium Vapor</option>
                      <option value="Mercury">Mercury</option>
                      <option value="Solar">Solar</option>
                      <option value="Fluorescent">{t('fieldData.fluorescent')}</option>
                      <option value="MetalHalide">{t('fieldData.metalHalide')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Power Rating (Watts)
                    </label>
                    <Input
                      type="number"
                      value={formData.power}
                      onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step: Advanced Info */}
            {currentStep === 'advanced-info' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Advanced Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('fieldData.engineer')}
                    </label>
                    <Input
                      value={formData.engineer}
                      onChange={(e) => setFormData({ ...formData, engineer: e.target.value })}
                      placeholder="Engineer name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('fieldData.streetType')}
                      </label>
                      <select
                        value={formData.streetType}
                        onChange={(e) => setFormData({ ...formData, streetType: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="">Select...</option>
                        <option value="calle">Calle</option>
                        <option value="avenida">Avenida</option>
                        <option value="paseo">Paseo</option>
                        <option value="camino">Camino</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('fieldData.poleHeight')}
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.poleHeight}
                        onChange={(e) => setFormData({ ...formData, poleHeight: e.target.value })}
                        placeholder="6.0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('fieldData.streetWidth')}
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.streetWidth}
                        onChange={(e) => setFormData({ ...formData, streetWidth: e.target.value })}
                        placeholder="10.5"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('fieldData.polesDistance')}
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.polesDistance}
                        onChange={(e) => setFormData({ ...formData, polesDistance: e.target.value })}
                        placeholder="25.0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('fieldData.disposition')}
                      </label>
                      <select
                        value={formData.disposition}
                        onChange={(e) => setFormData({ ...formData, disposition: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="unilateral">{t('fieldData.unilateral')}</option>
                        <option value="bilateral">{t('fieldData.bilateral')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('fieldData.quantity')}
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step: Condition */}
            {currentStep === 'condition' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Luminaire Condition
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Status
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['active', 'faulty', 'maintenance'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setFormData({ ...formData, status })}
                          className={cn(
                            'p-4 rounded-lg border-2 transition-all capitalize text-sm font-medium',
                            formData.status === status
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background text-foreground hover:border-primary/50',
                          )}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Zone / District
                      </label>
                      <Input
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                        placeholder="e.g., Zone 5"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Street Name
                      </label>
                      <Input
                        value={formData.streetName}
                        onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                        placeholder="e.g., Main Street"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step: Photos */}
            {currentStep === 'photos' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Photo Evidence
                </h3>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-medium mb-2">Upload Photos</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take photos for visual inspection (optional)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      Choose Photos
                    </label>
                  </Button>
                </div>
                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground mb-2">
                      {formData.photos.length} file(s) selected
                    </p>
                    <div className="space-y-1">
                      {formData.photos.map((file, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          {file.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step: Notes */}
            {currentStep === 'notes' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Additional Notes
                </h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any observations or special notes about this luminaire..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground min-h-32 resize-none"
                />
              </div>
            )}

            {/* Step: Confirm */}
            {currentStep === 'confirm' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Review & Submit
                </h3>
                <div className="bg-background/50 rounded-lg p-6 space-y-3 border border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">
                        {formData.latitude?.toFixed(4)}°, {formData.longitude?.toFixed(4)}°
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-sm font-medium text-foreground">
                        {formData.luminaireType || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Power</p>
                      <p className="text-sm font-medium text-foreground">
                        {formData.power || '—'} W
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {formData.status}
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      A unique QR code will be generated for this luminaire after submission.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = steps.findIndex((s) => s.id === currentStep);
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1].id as Step);
                  }
                }}
                disabled={currentStep === 'location'}
              >
                Back
              </Button>
              {currentStep === 'confirm' ? (
                <Button onClick={handleSubmit} className="flex-1 gap-2">
                  <Send className="w-4 h-4" />
                  Submit & Create QR Code
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const currentIndex = steps.findIndex((s) => s.id === currentStep);
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id as Step);
                    }
                  }}
                  className="flex-1"
                >
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
