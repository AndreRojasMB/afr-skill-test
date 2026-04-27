# Smart Public Lighting Management System

A modern, mobile-first web application for municipalities and energy companies to manage public lighting infrastructure with geolocation tracking, carbon footprint monitoring, field data collection, and QR asset tracking.

## Features Overview

### 1. **Dashboard (Main Panel)**
- **KPI Cards**: Total luminaires, active/faulty/maintenance counts, energy consumption, CO₂ emissions
- **Real-Time Alerts**: Critical, warning, and informational alerts with timestamps
- **Status Overview**: Visual breakdown of luminaire operational status with charts
- **Energy Consumption Chart**: Hourly energy usage trends and statistics
- **Carbon Emissions Chart**: Pie chart breakdown by luminaire type
- **Environmental Impact**: CO₂ reduction metrics and equivalent offsets

### 2. **Georeferenced Map View**
- **Interactive Map**: Visual representation of all luminaires with geolocation markers
- **Color-Coded Status**: Green (active), Red (faulty), Yellow (maintenance)
- **Zoom & Pan**: Full map controls with zoom in/out
- **Cluster Markers**: Scalable rendering for thousands of luminaires
- **Quick Details**: Click any marker to view asset details
- **Filtering**: Filter by status, type, emissions level
- **Search**: Find luminaires by name, ID, or location

### 3. **Field Data Collection Module**
- **Mobile-First Design**: Optimized for field technicians on smartphones
- **Multi-Step Form**: Location → Asset Info → Condition → Photos → Notes → Confirm
- **GPS Auto-Capture**: Automatic latitude/longitude capture with accuracy indicator
- **Photo Evidence**: Multiple photo upload with GPS metadata tagging
- **Offline Support**: Data stored locally, syncs when connection available
- **Instant Confirmation**: Success feedback with QR code generation

### 4. **Asset Management**
- **Searchable Inventory**: Find luminaires by name, ID, or location
- **Status Filters**: Filter by active, faulty, or maintenance status
- **Detailed View**: Technical specs, power consumption, type, last update
- **Bulk Actions**: Change status or schedule maintenance for multiple assets
- **Edit/Delete**: Modify or remove luminaire records
- **Export**: CSV/Excel export of asset inventory

### 5. **QR Code System (Asset Tracking)**
- **Automatic Generation**: Unique QR code created for each new luminaire
- **Scan Mode**: Use device camera to scan QR codes
- **Manual Input**: Alternative ID-based asset lookup
- **Asset Details**: Instant access to full luminaire information via QR scan
- **Status Updates**: Quick status change directly from QR scan interface
- **Scan History**: Track scan activity for field operations

### 6. **Carbon Footprint Analytics**
- **Emissions Tracking**: Real-time CO₂ calculations per luminaire
- **Type Breakdown**: LED vs. Sodium Vapor vs. Mercury emissions comparison
- **Baseline Comparison**: ~70% CO₂ savings for LED vs. traditional lighting
- **Environmental Impact**: Trees planted equivalent, cars off-road equivalent
- **Monthly Trends**: Historical emissions data with trend analysis
- **Export Reports**: PDF, Excel, CSV report generation

### 7. **Reports & Analytics**
- **Report Templates**: Operational, energy, carbon, and maintenance reports
- **Date Filtering**: Custom date ranges for analysis
- **Zone Filtering**: Filter reports by district or area
- **Export Options**: PDF, Excel, CSV formats
- **Recent Reports**: Quick access to previously generated reports
- **Batch Operations**: Generate multiple reports at once

### 8. **Settings & Configuration**
- **Organization Settings**: Company name, email, timezone
- **Notification Preferences**: Control alert types and frequency
- **User Management**: Team member roles (Admin, Operator, Technician)
- **API Access**: Enable/manage API keys for integrations
- **Data Management**: Export system data, configure integrations
- **Advanced Options**: Database management, data export tools

## Technical Architecture

### Pages & Routes
```
/                    - Login/Authentication page
/dashboard           - Main dashboard with KPIs and metrics
/assets              - Asset inventory management
/map                 - Interactive geolocation map
/field-data          - Mobile-optimized field data collection
/qr-scanner          - QR code scanner interface
/carbon              - Carbon footprint analytics
/reports             - Report generation and export
/settings            - System configuration
```

### Core Components
```
layout/
  - Sidebar.tsx         (Navigation with mobile hamburger menu)
  - Navbar.tsx          (Top bar with notifications and user menu)

dashboard/
  - KPICard.tsx         (Metric display cards with trends)
  - AlertsPanel.tsx     (Real-time alerts list)
  - StatusOverview.tsx  (Luminaire status chart)
  - EnergyChart.tsx     (Energy consumption trend line chart)
  - CarbonChart.tsx     (CO₂ emissions pie chart)

assets/
  - AssetTable.tsx      (Searchable inventory table with filters)

field/
  - FieldDataForm.tsx   (Multi-step geolocation form)

qr/
  - QRScanner.tsx       (QR scanner with manual input fallback)

common/
  - Skeleton.tsx        (Loading state placeholder)
```

### Design System

#### Color Palette
- **Primary**: Teal/Cyan (`oklch(0.65 0.2 185)`) - Main brand color
- **Accent**: Orange/Coral (`oklch(0.65 0.2 25)`) - Highlight accent
- **Background**: Deep Navy (`oklch(0.12 0 0)` dark / `oklch(0.95 0 0)` light)
- **Foreground**: Light Gray (`oklch(0.95 0 0)` dark / `oklch(0.15 0 0)` light)
- **Destructive**: Red (`oklch(0.62 0.25 29)`)

#### Typography
- **Font Family**: Geist (sans-serif) for all text
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400-500)
- **Monospace**: Geist Mono for data/codes

#### Layout
- **Mobile-First**: Optimized for smartphones (< 768px)
- **Responsive**: 2-column on tablets, 3-4 column on desktop
- **Flexbox Primary**: Used for most layouts
- **Spacing**: Tailwind scale (4px - 32px)

### Data Model

#### Luminaire Asset
```typescript
{
  id: string;                    // Unique identifier (LUM-001)
  name: string;                  // Display name
  location: string;              // Address or description
  latitude: number;              // GPS latitude
  longitude: number;             // GPS longitude
  type: 'LED' | 'Sodium' | 'Mercury' | 'Solar';
  power: number;                 // Watts
  status: 'active' | 'faulty' | 'maintenance';
  consumption: number;           // kWh
  qrCode: string;               // Unique QR code identifier
  installationDate: string;      // ISO date
  lastUpdate: string;            // Last update timestamp
  photos: File[];                // Evidence photos
  maintenanceHistory: object[];  // Service records
}
```

#### Alert
```typescript
{
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'info';
  timestamp: string;
  source: string;                // Asset ID or system
}
```

#### Report
```typescript
{
  id: string;
  template: string;              // Template type
  filters: object;               // Applied filters
  generatedAt: string;
  data: object;                  // Report payload
  format: 'pdf' | 'excel' | 'csv';
}
```

## Key Calculations

### Carbon Emissions
```
kWh = (Power in Watts × Hours of Operation × Days) / 1000
CO₂ = kWh × Emission Factor

Traditional Lighting: 0.92 kg CO₂/kWh
LED Lighting: 0.276 kg CO₂/kWh (70% reduction)
```

### Environmental Equivalents
```
1 Tree = ~21 kg CO₂/year
1 Car = ~4.6 tons CO₂/year
1 Home = ~5.5 tons CO₂/year
```

## Getting Started

### Login
- **Email**: demo@smartlighting.city
- **Password**: demo

### Navigation
1. **Sidebar** (Left): Main navigation menu with collapsible mobile view
2. **Navbar** (Top): Notifications, user profile, logout
3. **Breadcrumbs**: Page context and hierarchy

### Common Tasks

#### Adding a Luminaire (Field)
1. Go to **Field Data** page
2. Click "Capture Location" (auto GPS)
3. Enter luminaire type and power
4. Select condition status
5. Upload evidence photos
6. Add notes and confirm
7. QR code auto-generated

#### Searching for an Asset
1. Go to **Assets** page
2. Use search bar (name, ID, location)
3. Filter by status
4. Click to view details

#### Scanning QR Code
1. Go to **QR Scanner** page
2. Click "Start Camera" or "Manual Input"
3. Point at QR code or enter asset ID
4. View and edit asset details

#### Generating Reports
1. Go to **Reports** page
2. Select report template
3. Set date range and filters
4. Choose export format
5. Download PDF, Excel, or CSV

## Mobile Optimization

- **Responsive Design**: All pages adapt to mobile (< 768px)
- **Touch-Friendly**: 48px minimum touch targets
- **Fast Input**: Minimal form fields, auto-capture where possible
- **Offline Capable**: Field data stored locally, syncs on reconnection
- **Performance**: Optimized charts and lazy-loaded images
- **Mobile Menu**: Collapsible sidebar hamburger on small screens

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Future Enhancements

- [ ] Real-time WebSocket updates for live data
- [ ] IoT hardware integration (smart sensors)
- [ ] Machine learning for predictive maintenance
- [ ] Advanced heat map analytics
- [ ] Mobile app (React Native)
- [ ] Third-party API integrations
- [ ] Advanced user permissions/RBAC
- [ ] Multi-language support
- [ ] Dark/light mode toggle
- [ ] Email notifications and alerts

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- High contrast color combinations
- Screen reader friendly structure
- Focus indicators on interactive elements
- Semantic HTML throughout

## Performance

- Optimized Recharts for data visualization
- Lazy loading of images
- Efficient filtering without re-renders
- Minimal bundle size with tree-shaking
- Next.js 16 automatic code splitting

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Developed with**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Recharts
