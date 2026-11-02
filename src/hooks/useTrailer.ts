'use client';

import { useState, useEffect } from 'react';
import { type Movie, getMovieTrailerId, getMovieDirectTrailerUrl, getMovieEmbedUrl } from '@/data/Movies';

export interface UseTrailerResult {
  trailerId: string | null;
  embedUrl: string;
  directUrl: string;
  isLoading: boolean;
}

export function useTrailer(movie?: Movie | null, active: boolean = true): UseTrailerResult {
  const staticId = movie ? getMovieTrailerId(movie) : null;
  const initialEmbed = movie ? getMovieEmbedUrl(movie, staticId) : '';
  const initialDirect = movie
    ? staticId
      ? `https://www.youtube.com/watch?v=${staticId}`
      : getMovieDirectTrailerUrl(movie)
    : '';

  const [trailerId, setTrailerId] = useState<string | null>(staticId || null);
  const [embedUrl, setEmbedUrl] = useState<string>(initialEmbed);
  const [directUrl, setDirectUrl] = useState<string>(initialDirect);
  const [isLoading, setIsLoading] = useState<boolean>(!staticId && !!movie && active);

  useEffect(() => {
    if (!movie) {
      setTrailerId(null);
      setEmbedUrl('');
      setDirectUrl('');
      setIsLoading(false);
      return;
    }

    const currentStaticId = getMovieTrailerId(movie);
    if (currentStaticId) {
      setTrailerId(currentStaticId);
      setEmbedUrl(
        `https://www.youtube.com/embed/${currentStaticId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`
      );
      setDirectUrl(`https://www.youtube.com/watch?v=${currentStaticId}`);
      setIsLoading(false);
      return;
    }

    // If trailer playback is not requested yet, set fallback search URLs and don't fetch yet
    if (!active) {
      setTrailerId(null);
      setEmbedUrl(getMovieEmbedUrl(movie, null));
      setDirectUrl(getMovieDirectTrailerUrl(movie));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let isCancelled = false;

    const controller = new AbortController();
    const queryParams = new URLSearchParams({
      title: movie.title,
      year: movie.year || '',
      id: movie.id ? movie.id.toString() : '',
    });

    fetch(`/api/trailer?${queryParams.toString()}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isCancelled || !data) return;
        if (data.trailerId) {
          setTrailerId(data.trailerId);
        }
        if (data.embedUrl) {
          setEmbedUrl(data.embedUrl);
        }
        if (data.directUrl) {
          setDirectUrl(data.directUrl);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setEmbedUrl(getMovieEmbedUrl(movie, null));
          setDirectUrl(getMovieDirectTrailerUrl(movie));
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [movie?.id, movie?.title, movie?.year, active]);

  return { trailerId, embedUrl, directUrl, isLoading };
}
