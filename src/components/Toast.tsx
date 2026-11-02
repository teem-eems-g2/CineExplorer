'use client';

import React from 'react';
import { useWatchlist } from '@/context/WatchlistContext';

export default function Toast() {
  const { toasts } = useWatchlist();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl glass-dark border border-white/15 shadow-2xl backdrop-blur-xl animate-fade-in-up text-sm font-body text-cine-foreground"
          style={{ minWidth: '260px', maxWidth: '380px' }}
        >
          {toast.type === 'success' ? (
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-cine-accent/20 text-cine-accent flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          )}
          <span className="flex-1 font-500 leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
