# Smart Lighting Management System - Quick Start Guide

## Installation & Setup

### 1. Clone or Download the Project
```bash
git clone <repository-url>
cd smart-lighting-system
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
# Optional: API Integration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Geolocation
NEXT_PUBLIC_ENABLE_GEOLOCATION=true

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

### 4. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Steps

### 1. Login
- **Email**: `demo@smartlighting.city`
- **Password**: `demo`

### 2. Explore Dashboard
The dashboard shows:
- 📊 **KPI Cards**: Total luminaires, active/faulty/maintenance counts
- ⚡ **Energy Metrics**: Consumption trends
- 🌍 **Carbon Footprint**: CO₂ emissions and savings
- 🚨 **Real-Time Alerts**: System notifications

### 3. View Your Network
- Go to **Map View** to see all luminaires geographically
- Click any marker to view asset details
- Use filters to find specific luminaires

### 4. Add Your First Luminaire
- Navigate to **Field Data** (mobile-friendly)
- Click through the multi-step form:
  1. **Capture Location** (GPS)
  2. **Asset Info** (type, power)
  3. **Condition** (status, zone)
  4. **Photos** (evidence)
  5. **Notes** (optional)
- **Submit** - QR code auto-generated!

### 5. Scan Assets
- Go to **QR Scanner**
- Use camera to scan QR codes or manually enter asset ID
- View and update asset information instantly

### 6. Monitor Carbon Impact
- Open **Carbon Analytics**
- See CO₂ emissions breakdown
- Track environmental impact metrics
- View savings vs. traditional lighting

### 7. Generate Reports
- Go to **Reports**
- Select template (Operational, Energy, Carbon, Maintenance)
- Set date range and filters
- Export as PDF, Excel, or CSV

## Key Navigation

### Mobile
- 📱 Hamburger menu (top-left) for navigation
- Tap any nav item to jump to page
- Single-column layout optimized for phones

### Desktop
- 🔧 Persistent sidebar with all pages
- Top navbar with notifications and profile
- Multi-column layouts

## Common Tasks

### Find a Specific Luminaire
1. Go to **Assets**
2. Use search bar (name, ID, or location)
3. Or go to **Map** and click the marker
4. Or go to **QR Scanner** and scan/search ID

### Update Luminaire Status
1. Go to **Assets**
2. Click the luminaire row
3. Click **Edit** button
4. Change status and save
5. Or scan QR code and update directly

### Create Bulk Reports
1. Go to **Reports**
2. Select **Operational Status** template
3. Set date range
4. Click **Generate Report**
5. Download in your preferred format

### Configure Team Access
1. Go to **Settings**
2. Click **Users** tab
3. Add team members with roles:
   - 👨‍💼 **Admin**: Full access
   - 👨‍💻 **Operator**: Monitor & reports
   - 🔧 **Technician**: Field data only

### Monitor System Health
1. Check **Dashboard** for:
   - System health percentage
   - CO₂ reduction tracker
   - Real-time alerts
2. Address critical alerts immediately
3. Schedule maintenance for equipment

## Features Overview

| Feature | Page | Mobile | Purpose |
|---------|------|--------|---------|
| Real-time overview | Dashboard | ✅ | Executive summary |
| Network map | Map View | ✅ | Geolocation tracking |
| Asset search | Assets | ✅ | Find & manage lights |
| Field registration | Field Data | ✅ | Register new assets with GPS |
| QR scanning | QR Scanner | ✅ | Quick asset access |
| Carbon tracking | Carbon | ✅ | Monitor emissions |
| Report generation | Reports | ✅ | Data export |
| Configuration | Settings | ⚠️ | System setup |

✅ = Fully mobile optimized | ⚠️ = Desktop recommended

## Tips & Tricks

### 💡 Speed Up Field Work
- Use **Field Data** form on mobile
- Enable geolocation for auto-capture
- Take photos directly (GPS tagged)
- Works offline - syncs when online

### 🎯 Efficient Asset Lookup
- Use **QR Scanner** for quick lookup
- Search by street name in **Assets**
- Filter by status to find issues quickly

### 📊 Report Generation
- Schedule reports monthly for tracking
- Export to Excel for further analysis
- Use date filters for custom periods
- Compare month-to-month trends

### 🌍 Reduce Carbon Footprint
- Monitor LED adoption percentage
- Track monthly savings vs baseline
- Set reduction targets
- Share environmental impact

## Troubleshooting

### Can't login?
- Check email: `demo@smartlighting.city`
- Check password: `demo`
- Clear browser cookies and try again
- Check internet connection

### Map not loading?
- Map is simulated (no real geo provider)
- Markers show sample data
- In production, integrate Mapbox or Google Maps

### Geolocation not working?
- Enable location permissions in browser
- Check browser settings for camera/location
- HTTPS required for geolocation
- Test on mobile device

### Can't upload photos?
- Check file size (max 5MB recommended)
- Use JPEG or PNG format
- Ensure camera permissions enabled
- Clear browser cache if stuck

## Browser Requirements

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Android | Latest | ✅ Full |

## Performance Tips

### For Large Networks (1000+ luminaires)
- Use **Status Filter** to narrow results
- Search by location/zone instead of browsing all
- Load reports incrementally
- Close unused browser tabs

### For Maps
- Zoom in to reduce marker count
- Use status filters
- Don't open all asset details at once

### For Mobile
- Connect to Wi-Fi for initial load
- Enable offline mode for field work
- Close background apps
- Use recent iPhone/Android devices

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search |
| `?` | Show help |
| `Esc` | Close modals |
| `←` / `→` | Navigate pages |
| `Ctrl/Cmd + K` | Command palette |

## Next Steps

### Learn More
- Read [SYSTEM_README.md](./SYSTEM_README.md) for full documentation
- Read [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md) for backend setup

### Customize
- Update logo in sidebar header
- Change color theme in `app/globals.css`
- Modify email templates in settings
- Add your organization branding

### Deploy
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy

# Or use any Node.js hosting
npm start
```

### Get Support
- Check documentation files
- Review component source code
- Inspect browser console for errors
- Contact your system administrator

---

**Welcome to Smart Lighting Management!** 🌟

For detailed feature documentation, see [SYSTEM_README.md](./SYSTEM_README.md).
