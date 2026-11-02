import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { WatchlistProvider } from '@/context/WatchlistContext';
import WatchlistDrawer from '@/components/WatchlistDrawer';
import TrailerModal from '@/components/TrailerModal';
import TmdbKeyModal from '@/components/TmdbKeyModal';
import CinemaRouletteMount from '@/components/CinemaRouletteMount';
import Toast from '@/components/Toast';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'CineExplorer — Discover Movies, Shows & Trailers',
  description:
    'CineExplorer helps movie fans search, filter, and explore thousands of films and TV shows with rich posters, ratings, cast details, and trailers.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cine-bg text-cine-foreground antialiased selection:bg-cine-accent/30 selection:text-white">
        <WatchlistProvider>
          {children}
          <WatchlistDrawer />
          <TrailerModal />
          <TmdbKeyModal />
          <CinemaRouletteMount />
          <Toast />
        </WatchlistProvider>
      </body>
    </html>
  );
}
