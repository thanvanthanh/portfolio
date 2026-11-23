import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
// @ts-ignore: Allow side-effect import of global CSS in Next.js
import './globals.css';
import { PortfolioProvider } from '~/components/PortfolioProvider';
import SpatialCanvasHost from '~/components/three/SpatialCanvasHost';
import SpatialCursor from '~/components/three/SpatialCursor';
import DynamicIslandNav from '~/components/DynamicIslandNav';
import SmoothScrollProvider from '~/components/SmoothScrollProvider';
import CommandPalette from '~/components/CommandPalette';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = 'https://thanvanthanh.info.vn';
const siteName = 'Than Van Thanh — Mobile Engineer & AI-Native Systems';
const description =
  'Mobile Engineer with 5+ years in iOS and Flutter across fintech, banking, and super-apps. Drives AI-native workflows with Claude Code, Kiro, and MCP — backed by building a Go LLM Gateway and read-only PostgreSQL MCP server.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: '%s · Than Van Thanh',
  },
  description,
  applicationName: siteName,
  authors: [{ name: 'Than Van Thanh', url: siteUrl }],
  creator: 'Than Van Thanh',
  publisher: 'Than Van Thanh',
  keywords: [
    'Than Van Thanh',
    'iOS Developer',
    'Mobile Engineer',
    'Flutter Developer',
    'Swift',
    'SwiftUI',
    'RxSwift',
    'TCA',
    'VIPER',
    'MCP',
    'FastMCP',
    'LLM Gateway',
    'Claude Code',
    'Kiro',
    'Techcombank',
    'Portfolio',
    'Hanoi',
    'Vietnam',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName,
    title: siteName,
    description,
    url: siteUrl,
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    creator: '@thanvanthanh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f7fc' },
    { media: '(prefers-color-scheme: dark)', color: '#04050a' },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Than Van Thanh',
  jobTitle: 'Mobile Engineer & AI-Native Systems Builder',
  url: siteUrl,
  email: 'mailto:thanvanthanh1909@gmail.com',
  telephone: '+84366360222',
  worksFor: {
    '@type': 'Organization',
    name: 'CMC Global (onsite at Techcombank)',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hanoi',
    addressCountry: 'VN',
  },
  sameAs: [
    'https://github.com/thanvanthanh',
    'https://www.linkedin.com/in/than-van-thanh/',
  ],
  knowsAbout: [
    'iOS Development',
    'Swift',
    'SwiftUI',
    'Flutter',
    'RxSwift',
    'TCA',
    'Model Context Protocol (MCP)',
    'FastMCP',
    'LLM Gateway',
    'Go',
    'Python',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="spatial-grid font-sans antialiased">
        <PortfolioProvider>
          <SpatialCanvasHost />
          <SpatialCursor />
          <SmoothScrollProvider>
            <a id="top" />
            <DynamicIslandNav />
            <CommandPalette />
            <main className="relative z-10">{children}</main>
          </SmoothScrollProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
