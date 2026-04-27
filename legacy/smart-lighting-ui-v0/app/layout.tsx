import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClientWrapper } from '@/components/layout/client-wrapper'
import { LanguageProvider } from '@/lib/language-context'
import { MunicipalityProvider } from '@/lib/municipality-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Smart Lighting Management System',
  description: 'Municipal and energy company public lighting infrastructure management platform with geolocation tracking, carbon footprint monitoring, and field data collection.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>
          <MunicipalityProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
            <Analytics />
          </MunicipalityProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
