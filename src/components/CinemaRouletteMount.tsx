'use client';

import React from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import CinemaRouletteModal from './CinemaRouletteModal';

export default function CinemaRouletteMount() {
  const { isRouletteOpen, closeRoulette } = useWatchlist();
  return <CinemaRouletteModal isOpen={isRouletteOpen} onClose={closeRoulette} />;
}
