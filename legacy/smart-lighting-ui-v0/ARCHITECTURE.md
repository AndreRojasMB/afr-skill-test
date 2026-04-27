# Smart Lighting Management System - Architecture Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Browser / Mobile                        │
│                    Next.js Frontend Application                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
            ┌───────▼────────┐  │  ┌────────▼──────────┐
            │   REST API     │  │  │  WebSocket (Real- │
            │  (Fetch/SWR)   │  │  │   time Updates)   │
            └────────────────┘  │  └───────────────────┘
                    │            │            │
                    └────────────┼────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Backend Server       │
                    │  (Node.js/Express)     │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
        ┌───────▼────────┐  ┌───▼──────────┐  ┌──▼──────────┐
        │  PostgreSQL    │  │   File      │  │  External   │
        │   Database     │  │  Storage    │  │   Services  │
        └────────────────┘  └─────────────┘  └─────────────┘
```

## Frontend Architecture

### Page Structure
```
/app
├── page.tsx                    # Login/Authentication
├── layout.tsx                  # Root layout with navbar/sidebar
├── globals.css                 # Global styles & theme
├── dashboard/
│   └── page.tsx               # Main dashboard
├── assets/
│   └── page.tsx               # Asset management
├── map/
│   └── page.tsx               # Geolocation map view
├── field-data/
│   └── page.tsx               # Field data collection
├── qr-scanner/
│   └── page.tsx               # QR scanner interface
├── carbon/
│   └── page.tsx               # Carbon analytics
├── reports/
│   └── page.tsx               # Report generation
└── settings/
    └── page.tsx               # System configuration
```

### Component Hierarchy
```
RootLayout
├── Sidebar (Navigation)
│   └── Nav Items (8 pages)
├── Navbar (Top Bar)
│   ├── Notifications Bell
│   └── User Menu
└── Main Content
    ├── Dashboard
    │   ├── KPICard (x4)
    │   ├── AlertsPanel
    │   ├── StatusOverview
    │   ├── EnergyChart
    │   └── CarbonChart
    ├── Assets
    │   └── AssetTable
    ├── Map
    │   ├── MapContainer
    │   ├── Luminaire Markers
    │   └── MapLegend
    ├── Field Data
    │   └── FieldDataForm (Multi-step)
    ├── QR Scanner
    │   └── QRScanner
    ├── Carbon
    │   ├── KPICard (x4)
    │   ├── LineChart (Emissions Trend)
    │   ├── BarChart (By Type)
    │   └── PieChart (Distribution)
    ├── Reports
    │   ├── Report Templates
    │   └── Report List
    └── Settings
        └── Settings Tabs
```

## Data Flow

### Adding a New Luminaire (Field Data)
```
User Input (Form)
     │
     ▼
Field Data Component
     │
     ├─► GPS Capture (Geolocation API)
     ├─► Asset Info Entry
     ├─► Condition Selection
     ├─► Photo Upload (with GPS metadata)
     └─► Notes
     │
     ▼
Form Validation
     │
     ▼
API Call POST /luminaires
     │
     ▼
Backend Processing
     ├─► Database Insert
     ├─► QR Code Generation
     ├─► Photo Storage
     └─► Notification Trigger
     │
     ▼
Success Response
     │
     ├─► Update Map View
     ├─► Add to Assets List
     └─► Show Success Toast
```

### Viewing Assets (Map)
```
Map Page Load
     │
     ▼
Fetch /luminaires
     │
     ▼
Transform to GeoJSON
     │
     ├─► Latitude/Longitude
     ├─► Status (color)
     └─► Asset ID
     │
     ▼
Render Map Markers
     │
     ├─► Green = Active
     ├─► Red = Faulty
     └─► Yellow = Maintenance
     │
     ▼
User Click Marker
     │
     ▼
Show Asset Details Panel
     │
     └─► Open Full Asset View
```

### Generating Reports
```
Report Request
     │
     ├─► Select Template
     ├─► Set Date Range
     └─► Choose Filters
     │
     ▼
API Call POST /reports/generate
     │
     ▼
Backend Aggregation
     ├─► Query Luminaires
     ├─► Calculate Metrics
     ├─► Format Data
     └─► Generate PDF/Excel
     │
     ▼
Return File Stream
     │
     ▼
Browser Download
     │
     └─► User Receives File
```

## Technology Stack

### Frontend
```
┌─────────────────────────────────────────┐
│          React 19 / Next.js 16           │
│  (Server Components + Client Components) │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
┌───────▼───┐ ┌───▼───┐ ┌───▼────────┐
│  Recharts │ │ Radix │ │Tailwind CSS│
│(Data Viz) │ │  UI   │ │   (Styling)│
└───────────┘ └───────┘ └────────────┘
```

### Styling System
```
Tailwind CSS 4 + Custom Theme
         │
         ├─► Color Variables (oklch)
         ├─► Spacing Scale
         ├─► Typography System
         └─► Component Classes
              │
              └─► Dark Mode (Forced)
                   └─► Deep Navy (oklch 0.12)
                   └─► Teal Primary (oklch 0.65)
                   └─► Orange Accent (oklch 0.65)
```

### State Management
```
React Context + Local State
         │
         ├─► SWR (Data Fetching)
         ├─► useState (Component State)
         └─► useCallback (Event Handlers)

For Complex Apps, add:
├─► Zustand (Global State)
└─► TanStack Query (Advanced Caching)
```

## Database Schema (PostgreSQL)

### Core Tables
```
Users
├── id (PK)
├── email (UNIQUE)
├── password (hashed)
├── name
├── role (Admin/Operator/Technician)
└── organizationId (FK)

Organizations
├── id (PK)
├── name
├── email
├── timezone
└── settings (JSON)

Luminaires
├── id (PK)
├── name
├── latitude (FLOAT)
├── longitude (FLOAT)
├── type (LED/Sodium/Mercury/Solar)
├── power (INT)
├── status (Active/Faulty/Maintenance)
├── consumption (FLOAT)
├── qrCode (UNIQUE)
├── installationDate
├── lastUpdate
└── organizationId (FK)

Photos
├── id (PK)
├── luminaireId (FK)
├── latitude (FLOAT)
├── longitude (FLOAT)
├── url (S3 path)
└── uploadedAt

Alerts
├── id (PK)
├── luminaireId (FK)
├── title
├── description
├── severity (Critical/Warning/Info)
├── acknowledged
└── createdAt

FieldData
├── id (PK)
├── luminaireId (FK, UNIQUE)
├── zone
├── streetName
├── notes
└── timestamps

MaintenanceLogs
├── id (PK)
├── luminaireId (FK)
├── action
├── notes
└── createdAt

Reports
├── id (PK)
├── organizationId (FK)
├── template (type)
├── filters (JSON)
├── data (JSON)
├── format (PDF/Excel/CSV)
└── timestamps
```

## API Architecture

### Endpoint Categories
```
/api
├── /auth              # Login, logout, refresh token
├── /luminaires        # CRUD operations on assets
├── /field-data        # Field form submissions
├── /alerts            # Alert management
├── /carbon            # CO₂ calculations
├── /reports           # Report generation
├── /qr                # QR code operations
└── /settings          # Organization settings
```

### Authentication Flow
```
Login Request
     │
     ▼
Validate Email/Password
     │
     ├─ Invalid ──► Return 401
     │
     ▼
     ├─ Valid ──► Generate JWT Token
               ├── Access Token (15 min)
               └── Refresh Token (7 days)
     │
     ▼
Return Tokens
     │
     ├─► Store in localStorage/cookie
     └─► Include in subsequent requests
           (Authorization: Bearer {token})
```

## Deployment Architecture

### Development
```
localhost:3000    # Next.js Dev Server
localhost:3001    # Backend API (optional)
```

### Production
```
┌────────────────────────────────┐
│        Vercel CDN              │
│   (Global Edge Network)        │
└───────────────┬────────────────┘
                │
        ┌───────▼─────────┐
        │  Vercel Compute │
        │  (Next.js)      │
        └───────┬─────────┘
                │
        ┌───────▼──────────────┐
        │  Backend Server      │
        │  (Node.js/Docker)    │
        └───────┬──────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼──┐  ┌────▼────┐ ┌──▼──────────┐
│ RDS  │  │  S3/    │ │  CloudWatch │
│(DB)  │  │ Storage │ │  (Logs)     │
└──────┘  └─────────┘ └─────────────┘
```

## Performance Optimization

### Frontend Optimization
```
Code Splitting
├─► Automatic route-based splitting
├─► Component lazy loading
└─► Dynamic imports

Image Optimization
├─► Next.js Image component
├─► Automatic WebP/AVIF
└─► Lazy loading

Caching Strategy
├─► SWR for API data
├─► Browser cache headers
├─► Static generation where possible
└─► ISR for semi-dynamic pages
```

### Database Optimization
```
Indexing
├─► organizationId
├─► status
├─► type
├─► latitude/longitude
└─► qrCode (UNIQUE)

Query Optimization
├─► Pagination for large lists
├─► Select specific columns
├─► Avoid N+1 queries
└─► Connection pooling
```

## Security Architecture

### Authentication & Authorization
```
┌─────────────────────────────────┐
│  User Login                      │
│  (Email + Password)              │
└─────────────┬───────────────────┘
              │
              ▼
     ┌────────────────┐
     │ JWT Token      │
     │ (Signed)       │
     └────────┬───────┘
              │
    ┌─────────▼─────────┐
    │ Role-Based Access │
    │ (RBAC)            │
    ├─ Admin            │
    ├─ Operator         │
    └─ Technician       │
```

### Data Protection
```
Passwords
├─► Hashed with bcrypt (cost 10)
└─► Never stored plain text

API Keys
├─► Stored in environment variables
└─► Rotated regularly

HTTPS
├─► All connections encrypted
└─► SSL/TLS certificates

CORS
├─► Restrict origins
└─► Validate requests
```

## Scalability Considerations

### For 10,000+ Luminaires
```
├─► Map clustering on client
├─► Pagination in tables
├─► Incremental report loading
├─► Database indexing
└─► CDN caching

Real-time Updates
├─► WebSocket connection pooling
├─► Message queue (Redis/RabbitMQ)
└─► Event-driven architecture
```

### Multi-Tenant Support
```
├─► Organization isolation
├─► Row-level security (RLS)
├─► Data segregation
└─► Separate databases (optional)
```

---

**This architecture supports scalability from small municipalities to large metropolitan systems managing 10,000+ luminaires.**
