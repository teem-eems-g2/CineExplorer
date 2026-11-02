import { NextRequest, NextResponse } from 'next/server';
import { searchLiveMovies } from '@/lib/tmdb';
import { searchMovies } from '@/data/Movies';
import { searchOmdb } from '@/lib/omdb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();
  const customKey = request.headers.get('x-tmdb-key') || searchParams.get('key') || undefined;

  if (!query) {
    return NextResponse.json({ source: 'none', count: 0, movies: [] });
  }

  // 1. Check local curated movies first for instant matches
  const localResults = searchMovies(query);

  // 2. If user configured TMDB key, query TMDB live
  try {
    const tmdbResults = await searchLiveMovies(query, customKey);
    if (tmdbResults && tmdbResults.length > 0) {
      // Merge unique
      const titles = new Set(tmdbResults.map((m) => m.title.toLowerCase()));
      const merged = [
        ...tmdbResults,
        ...localResults.filter((m) => !titles.has(m.title.toLowerCase())),
      ];
      return NextResponse.json({
        source: 'tmdb_live',
        query,
        count: merged.length,
        movies: merged,
      });
    }
  } catch {
    // TMDB key not present or network error
  }

  // 3. Query open global movie database (OMDb) — finds ANY film in cinema history (e.g. "The Odyssey")
  try {
    const omdbResults = await searchOmdb(query);
    if (omdbResults && omdbResults.length > 0) {
      const titles = new Set(localResults.map((m) => m.title.toLowerCase()));
      const merged = [
        ...localResults,
        ...omdbResults.filter((m) => !titles.has(m.title.toLowerCase())),
      ];
      return NextResponse.json({
        source: 'omdb_global',
        query,
        count: merged.length,
        movies: merged,
      });
    }
  } catch {
    // Fallback
  }

  // 4. Return local results if available
  return NextResponse.json({
    source: 'curated_offline',
    query,
    count: localResults.length,
    movies: localResults,
  });
}
