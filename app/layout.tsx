import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { invitationConfig } from '@/lib/invitation-config'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const { partnerOne, partnerTwo } = invitationConfig.couple

export const metadata: Metadata = {
  title: `${partnerOne} & ${partnerTwo} — Invitație de nuntă`,
  description: `Vă invităm cu drag la nunta lui ${partnerOne} și ${partnerTwo}, pe 12 iunie 2027. Invitație digitală Palfi Events.`,
  generator: 'v0.app',
  robots: { index: false, follow: false },
  openGraph: {
    title: `${partnerOne} & ${partnerTwo} — Invitație de nuntă`,
    description: 'O scrisoare pentru voi. Deschideți invitația și confirmați-vă prezența.',
    locale: 'ro_RO',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: invitationConfig.theme.colors.burgundy,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
