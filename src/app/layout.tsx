import type { Metadata, Viewport } from 'next';
// @ts-ignore: Allow side-effect import of global CSS in Next.js
import './globals.css';
import NavBar from '~/components/NavBar';
import RevealObserver from '~/components/RevealObserver';

const siteUrl = 'https://thanvanthanh.info.vn';
const siteName = 'Than Van Thanh — Mobile Developer';
const description =
  'Senior iOS / Mobile Developer with 5+ years of experience in Swift, Objective-C and Flutter. Shipped enterprise super-apps, fintech, food delivery and crypto exchange products — obsessed with smooth UI, clean architecture and real performance.';

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
    'Thanh Than',
    'iOS Developer',
    'Mobile Developer',
    'Flutter Developer',
    'Swift',
    'SwiftUI',
    'Objective-C',
    'TCA',
    'VIPER',
    'Portfolio',
    'Hanoi',
    'Vietnam',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0f' },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Than Van Thanh',
  jobTitle: 'Senior iOS / Mobile Developer',
  url: siteUrl,
  email: 'mailto:thanvanthanh1909@gmail.com',
  telephone: '+84366360222',
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
    'Objective-C',
    'Flutter',
    'Mobile Architecture',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-[var(--bg)] text-ink antialiased">
        <a id="top"></a>
        <NavBar />
        <main className="pt-12">{children}</main>
        <RevealObserver />
      </body>
    </html>
  );
}
