import { NextRequest, NextResponse } from 'next/server';
import {
  getLiveNowPlaying,
  getLiveTrending,
  getLiveUpcoming,
} from '@/lib/tmdb';
import { trendingMovies, allMovies } from '@/data/Movies';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'now_playing';
  const customKey = request.headers.get('x-tmdb-key') || searchParams.get('key') || undefined;

  try {
    let movies = [];
    if (category === 'now_playing') {
      movies = await getLiveNowPlaying(customKey);
    } else if (category === 'trending') {
      movies = await getLiveTrending(customKey);
    } else if (category === 'upcoming') {
      movies = await getLiveUpcoming(customKey);
    } else {
      movies = await getLiveTrending(customKey);
    }

    if (movies && movies.length > 0) {
      return NextResponse.json({
        source: 'tmdb_live',
        category,
        count: movies.length,
        movies,
      });
    }
  } catch {
    // TMDB key not configured or rate limit hit — fallback to curated dataset
  }

  // Curated Fallback
  let fallbackList = trendingMovies.now_playing;
  if (category === 'trending') fallbackList = trendingMovies.trending;
  else if (category === 'toprated') fallbackList = trendingMovies.toprated;
  else if (category === 'upcoming') fallbackList = trendingMovies.upcoming;
  else if (category === 'now_playing') fallbackList = trendingMovies.now_playing;
  else fallbackList = allMovies.slice(0, 10);

  return NextResponse.json({
    source: 'curated_offline',
    category,
    count: fallbackList.length,
    movies: fallbackList,
  });
}
