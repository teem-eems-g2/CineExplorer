'use client';

import React, { useState, useEffect } from 'react';
import { useWatchlist } from '@/context/WatchlistContext';

export default function TmdbKeyModal() {
  const {
    isTmdbModalOpen,
    closeTmdbModal,
    tmdbKey,
    saveTmdbKey,
    refreshLiveMovies,
    isLiveLoading,
    showToast,
  } = useWatchlist();

  const [inputKey, setInputKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isTmdbModalOpen) {
      setInputKey(tmdbKey);
      setStatusMsg(null);
    }
  }, [isTmdbModalOpen, tmdbKey]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTmdbModal();
    };
    if (isTmdbModalOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isTmdbModalOpen, closeTmdbModal]);

  if (!isTmdbModalOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = inputKey.trim();
    if (!key) {
      saveTmdbKey('');
      closeTmdbModal();
      return;
    }

    setTesting(true);
    setStatusMsg(null);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`);
      const data = await res.json();
      if (res.ok && data.results) {
        saveTmdbKey(key);
        setStatusMsg('Success! Connected to TMDB Live.');
        setTimeout(() => {
          refreshLiveMovies();
          closeTmdbModal();
        }, 800);
      } else {
        setStatusMsg(data.status_message || 'Invalid TMDB API Key. Please verify.');
        showToast('Invalid API Key provided', 'alert');
      }
    } catch {
      setStatusMsg('Network error validating key. Please try again.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tmdb-modal-title"
      onClick={(e) => e.target === e.currentTarget && closeTmdbModal()}
    >
      <div className="w-full max-w-lg glass-dark rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl bg-cine-bg/95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <h3 id="tmdb-modal-title" className="font-display font-800 text-xl text-cine-foreground">
              Live TMDB Movie Sync
            </h3>
          </div>

          <button
            onClick={closeTmdbModal}
            className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/15 transition-colors text-cine-foreground/70"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-4">
          <p className="text-sm text-cine-foreground/80 font-body leading-relaxed">
            Connect directly to <strong>The Movie Database (TMDB)</strong> to automatically stream
            real-time now-playing theatrical releases, box office trending, and live metadata.
          </p>

          <div className="p-4 rounded-2xl glass border border-white/08 space-y-2">
            <div className="flex items-center justify-between text-xs font-body">
              <span className="text-cine-muted uppercase tracking-wider font-700">Connection Status:</span>
              <span className={`font-display font-700 ${tmdbKey ? 'text-emerald-400' : 'text-amber-400'}`}>
                {tmdbKey ? '● Live TMDB Connected' : '○ Standby (Curated Releases Active)'}
              </span>
            </div>
            <p className="text-xs text-cine-muted font-body">
              {tmdbKey
                ? 'Your app is actively fetching real-time new releases from TMDB.'
                : 'Enter your free TMDB API key below to unlock continuous live movie stream updates.'}
            </p>
          </div>

          <form onSubmit={handleTestAndSave} className="space-y-4 pt-2">
            <div>
              <label htmlFor="tmdbKeyInput" className="block text-xs font-display font-700 text-cine-muted uppercase tracking-wider mb-2">
                TMDB v3 API Key:
              </label>
              <input
                id="tmdbKeyInput"
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="e.g. 1a2b3c4d5e6f7g8h9i0..."
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-cine-foreground font-mono text-sm focus:border-cine-accent focus:outline-none transition-colors"
              />
            </div>

            {statusMsg && (
              <p
                className={`text-xs font-body ${
                  statusMsg.startsWith('Success') ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {statusMsg}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://www.themoviedb.org/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cine-accent hover:underline font-body flex items-center gap-1"
              >
                Get a free TMDB key →
              </a>

              <div className="flex items-center gap-2">
                {tmdbKey && (
                  <button
                    type="button"
                    onClick={() => {
                      saveTmdbKey('');
                      setInputKey('');
                      closeTmdbModal();
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-display font-600 text-cine-foreground/50 hover:text-red-400 hover:bg-white/05 transition-colors"
                  >
                    Disconnect
                  </button>
                )}

                <button
                  type="submit"
                  disabled={testing}
                  className="btn-primary px-6 py-2.5 rounded-xl text-xs font-display font-700 disabled:opacity-50"
                >
                  {testing ? 'Testing...' : tmdbKey ? 'Update Key' : 'Connect Key'}
                </button>
              </div>
            </div>
          </form>

          {/* Quick Refresh Button */}
          <div className="pt-4 border-t border-white/08 flex items-center justify-between">
            <span className="text-xs text-cine-muted font-body">Have new releases changed?</span>
            <button
              type="button"
              onClick={refreshLiveMovies}
              disabled={isLiveLoading}
              className="px-4 py-2 rounded-xl glass text-xs font-display font-600 text-cine-foreground hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={isLiveLoading ? 'animate-spin' : ''}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{isLiveLoading ? 'Refreshing...' : 'Refresh Releases Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
