import { NextRequest, NextResponse } from 'next/server';
import { getLiveMovieDetails } from '@/lib/tmdb';
import { getMovieById } from '@/data/Movies';
import { getOmdbMovieDetails } from '@/lib/omdb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const customKey = request.headers.get('x-tmdb-key') || undefined;

  // 1. Check curated local
  const localMovie = getMovieById(id);
  if (localMovie) {
    return NextResponse.json({ source: 'curated_offline', movie: localMovie });
  }

  // 2. Try live TMDB if key configured
  if (id) {
    try {
      const liveMovie = await getLiveMovieDetails(id, customKey);
      if (liveMovie) {
        return NextResponse.json({ source: 'tmdb_live', movie: liveMovie });
      }
    } catch {}
  }

  // 3. Try open OMDb details
  if (id) {
    try {
      const omdbMovie = await getOmdbMovieDetails(id);
      if (omdbMovie) {
        return NextResponse.json({ source: 'omdb_global', movie: omdbMovie });
      }
    } catch {}
  }

  return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
}
