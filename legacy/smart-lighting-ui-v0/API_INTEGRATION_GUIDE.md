# Smart Lighting Management System - API Integration Guide

This guide provides examples for integrating the Smart Lighting Management System frontend with a backend API.

## Base API Setup

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

### API Client Example
```typescript
// lib/api-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
```

## API Endpoints

### Authentication
```
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
```

### Luminaires (Assets)
```
GET    /luminaires                    # List all
GET    /luminaires/{id}               # Get single
POST   /luminaires                    # Create new
PUT    /luminaires/{id}               # Update
DELETE /luminaires/{id}               # Delete
GET    /luminaires?status=active      # Filter by status
GET    /luminaires?type=LED           # Filter by type
GET    /luminaires?zone=zone1         # Filter by zone
GET    /luminaires/search?q=Main      # Search by name/location
GET    /luminaires/map                # Get all for map view
```

### Field Data Collection
```
POST   /field-data                    # Submit field form
GET    /field-data/{id}               # Get submission
PUT    /field-data/{id}               # Update submission
POST   /field-data/{id}/photos        # Upload photos with GPS metadata
GET    /field-data/offline            # Sync offline queue
```

### Alerts
```
GET    /alerts                        # Get active alerts
GET    /alerts?severity=critical      # Filter by severity
POST   /alerts/{id}/acknowledge       # Mark as read
GET    /alerts/history                # Historical alerts
```

### Carbon Footprint
```
GET    /carbon/emissions              # Get current emissions
GET    /carbon/emissions/monthly      # Monthly trend data
GET    /carbon/emissions/by-type      # Breakdown by luminaire type
GET    /carbon/savings                # Savings vs. baseline
POST   /carbon/calculate              # Calculate custom scenario
```

### Reports
```
GET    /reports/templates             # Available templates
POST   /reports/generate              # Generate report
GET    /reports                       # List generated reports
GET    /reports/{id}                  # Get report content
DELETE /reports/{id}                  # Delete report
POST   /reports/{id}/export           # Export as PDF/Excel/CSV
```

### QR Codes
```
GET    /qr/{assetId}/generate         # Generate QR code
GET    /qr/{assetId}/scan-history     # QR scan history
POST   /qr/{assetId}/scan             # Log QR scan
```

### Settings
```
GET    /settings                      # Get organization settings
PUT    /settings                      # Update settings
GET    /settings/users                # List team members
POST   /settings/users                # Add user
PUT    /settings/users/{id}           # Update user
DELETE /settings/users/{id}           # Remove user
GET    /settings/integrations         # List integrations
POST   /settings/integrations         # Configure integration
```

## Usage Examples

### Fetching Luminaires with SWR
```typescript
// components/assets/asset-table.tsx
import useSWR from 'swr';
import { apiClient } from '@/lib/api-client';

export function AssetTable() {
  const { data: assets, error, isLoading } = useSWR(
    '/luminaires',
    (url) => apiClient.get(url)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <table>
      {assets?.map((asset) => (
        <tr key={asset.id}>
          <td>{asset.name}</td>
          <td>{asset.status}</td>
          {/* ... */}
        </tr>
      ))}
    </table>
  );
}
```

### Creating a New Luminaire (Server Action)
```typescript
// app/field-data/actions.ts
'use server';

import { apiClient } from '@/lib/api-client';

export async function submitFieldData(formData: any) {
  try {
    const response = await apiClient.post('/field-data', {
      latitude: formData.latitude,
      longitude: formData.longitude,
      type: formData.luminaireType,
      power: formData.power,
      status: formData.status,
      zone: formData.zone,
      streetName: formData.streetName,
      notes: formData.notes,
      photos: formData.photos,
    });

    // Generate QR code after creation
    if (response.id) {
      const qrResponse = await apiClient.post(
        `/qr/${response.id}/generate`,
        { format: 'png' }
      );
      return { ...response, qr: qrResponse.qrCode };
    }

    return response;
  } catch (error) {
    console.error('Error creating luminaire:', error);
    throw error;
  }
}
```

### Real-Time Alerts with WebSocket
```typescript
// hooks/use-alerts.ts
import { useEffect, useState } from 'react';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
    );

    ws.onmessage = (event) => {
      const alert = JSON.parse(event.data);
      if (alert.type === 'alert') {
        setAlerts((prev) => [alert.payload, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  return alerts;
}
```

### Carbon Calculations
```typescript
// lib/carbon-calculations.ts
export function calculateEmissions(
  powerWatts: number,
  hoursOperation: number,
  luminaireType: 'LED' | 'Sodium' | 'Mercury'
): {
  kWh: number;
  co2Traditional: number;
  co2Actual: number;
  saved: number;
} {
  // kWh = (W × Hours) / 1000
  const kWh = (powerWatts * hoursOperation) / 1000;

  // Emission factors
  const emissionFactors = {
    LED: 0.276,
    Sodium: 0.92,
    Mercury: 1.05,
  };

  const factorTraditional = 0.92; // Baseline
  const factorActual = emissionFactors[luminaireType];

  const co2Traditional = kWh * factorTraditional;
  const co2Actual = kWh * factorActual;
  const saved = co2Traditional - co2Actual;

  return {
    kWh,
    co2Traditional,
    co2Actual,
    saved,
  };
}
```

### Field Data Offline Support
```typescript
// lib/offline-storage.ts
export const offlineStorage = {
  async saveFieldData(data: FieldDataForm) {
    const queue = JSON.parse(
      localStorage.getItem('fieldDataQueue') || '[]'
    );
    queue.push({
      id: `offline-${Date.now()}`,
      data,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('fieldDataQueue', JSON.stringify(queue));
  },

  async syncQueue() {
    const queue = JSON.parse(
      localStorage.getItem('fieldDataQueue') || '[]'
    );

    for (const item of queue) {
      try {
        await apiClient.post('/field-data', item.data);
        // Remove from queue on success
        const updated = queue.filter((q) => q.id !== item.id);
        localStorage.setItem('fieldDataQueue', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to sync field data:', error);
        // Keep in queue for retry
      }
    }
  },
};
```

### Generate Reports
```typescript
// components/reports/report-generator.tsx
export async function generateReport(
  template: string,
  filters: ReportFilters
) {
  const response = await apiClient.post('/reports/generate', {
    template,
    startDate: filters.startDate,
    endDate: filters.endDate,
    zone: filters.zone,
    format: 'pdf', // or 'excel', 'csv'
  });

  // Download file
  const blob = new Blob([response.data], {
    type: 'application/pdf',
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `report-${Date.now()}.pdf`;
  a.click();
}
```

## Database Schema

### PostgreSQL with Prisma ORM

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  password  String
  name      String
  role      Role    @default(TECHNICIAN)
  organization Organization @relation(fields: [organizationId], references: [id])
  organizationId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Organization {
  id        Int     @id @default(autoincrement())
  name      String
  email     String
  timezone  String
  users     User[]
  luminaires Luminaire[]
  settings  Settings?
}

model Luminaire {
  id            String   @id @default(cuid())
  name          String
  location      String
  latitude      Float
  longitude     Float
  type          LuminaireType
  power         Int      // Watts
  status        LuminaireStatus @default(ACTIVE)
  qrCode        String   @unique
  consumption   Float    // kWh
  installationDate DateTime
  lastUpdate    DateTime @updatedAt
  photos        Photo[]
  maintenanceLog MaintenanceLog[]
  fieldData     FieldData?
  alerts        Alert[]
  organization  Organization @relation(fields: [organizationId], references: [id])
  organizationId Int
}

model Photo {
  id        String   @id @default(cuid())
  luminaire Luminaire @relation(fields: [luminaireId], references: [id])
  luminaireId String
  latitude  Float
  longitude Float
  url       String
  uploadedAt DateTime @default(now())
}

model FieldData {
  id        String   @id @default(cuid())
  luminaire Luminaire @relation(fields: [luminaireId], references: [id])
  luminaireId String @unique
  zone      String
  streetName String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model MaintenanceLog {
  id        String   @id @default(cuid())
  luminaire Luminaire @relation(fields: [luminaireId], references: [id])
  luminaireId String
  action    String
  notes     String?
  createdAt DateTime @default(now())
}

model Alert {
  id        String   @id @default(cuid())
  luminaire Luminaire @relation(fields: [luminaireId], references: [id])
  luminaireId String
  title     String
  description String
  severity  AlertSeverity
  acknowledged Boolean @default(false)
  createdAt DateTime @default(now())
}

model Settings {
  id             String  @id @default(cuid())
  organization   Organization @relation(fields: [organizationId], references: [id])
  organizationId Int @unique
  theme          String @default("dark")
  emailNotifications Boolean @default(true)
}

enum Role {
  ADMIN
  OPERATOR
  TECHNICIAN
}

enum LuminaireType {
  LED
  SODIUM
  MERCURY
  SOLAR
}

enum LuminaireStatus {
  ACTIVE
  FAULTY
  MAINTENANCE
  RETIRED
}

enum AlertSeverity {
  CRITICAL
  WARNING
  INFO
}
```

## Error Handling

```typescript
// lib/api-errors.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: any): APIError {
  if (error instanceof APIError) return error;

  if (error.response?.status === 401) {
    // Redirect to login
    window.location.href = '/';
  }

  return new APIError(
    error.response?.status || 500,
    error.response?.data?.message || 'An error occurred',
    error.response?.data
  );
}
```

## Testing

```typescript
// __tests__/api.test.ts
import { apiClient } from '@/lib/api-client';

describe('API Client', () => {
  it('should fetch luminaires', async () => {
    const luminaires = await apiClient.get('/luminaires');
    expect(luminaires).toHaveLength(5);
  });

  it('should create new luminaire', async () => {
    const response = await apiClient.post('/luminaires', {
      name: 'Test Light',
      type: 'LED',
      power: 150,
    });
    expect(response.id).toBeDefined();
  });
});
```

## Rate Limiting

Most endpoints implement rate limiting:
- **Standard**: 100 requests per minute
- **Maps**: 50 requests per minute
- **Reports**: 10 requests per minute

Response headers include:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1630623841
```

---

For full backend implementation, refer to the server-side documentation.
