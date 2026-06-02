import type { Metadata, Viewport } from 'next';
import './globals.css';
import NavBar from '~/components/NavBar';
import RevealObserver from '~/components/RevealObserver';

export const metadata: Metadata = {
  title: 'Thanh Than — Mobile Developer',
  description:
    'Mobile developer building polished iOS and Flutter products that people open every day.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfbfd',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
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
