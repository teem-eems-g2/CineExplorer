import { type Movie, type CastMember } from '@/data/Movies';

export const TMDB_GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

export function getTmdbApiKey(overrideKey?: string): string {
  if (overrideKey && overrideKey.trim()) return overrideKey.trim();
  return (
    process.env.TMDB_API_KEY ||
    process.env.NEXT_PUBLIC_TMDB_API_KEY ||
    ''
  );
}

export function transformTmdbMovie(raw: any): Movie {
  const genres: string[] = Array.isArray(raw.genres)
    ? raw.genres.map((g: any) => g.name)
    : Array.isArray(raw.genre_ids)
    ? raw.genre_ids.map((id: number) => TMDB_GENRES[id] || 'Cinema')
    : ['Cinema'];

  const poster = raw.poster_path
    ? `${TMDB_IMAGE_BASE}${raw.poster_path}`
    : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

  const backdrop = raw.backdrop_path
    ? `${TMDB_BACKDROP_BASE}${raw.backdrop_path}`
    : poster;

  const year = raw.release_date ? raw.release_date.substring(0, 4) : '2025';

  const cast: CastMember[] = Array.isArray(raw.credits?.cast)
    ? raw.credits.cast.slice(0, 8).map((c: any) => ({
        name: c.name || 'Cast Member',
        role: c.character || 'Actor',
        photo: c.profile_path
          ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      }))
    : [];

  const directorObj = raw.credits?.crew?.find((cr: any) => cr.job === 'Director');
  const director = directorObj ? directorObj.name : 'Renowned Filmmaker';

  // Find official trailer video
  let trailerYoutubeId: string | undefined = undefined;
  if (Array.isArray(raw.videos?.results)) {
    const trailer =
      raw.videos.results.find(
        (v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
      ) || raw.videos.results.find((v: any) => v.site === 'YouTube');
    if (trailer) {
      trailerYoutubeId = trailer.key;
    }
  }

  const runtimeMinutes = raw.runtime || 120;
  const hours = Math.floor(runtimeMinutes / 60);
  const mins = runtimeMinutes % 60;
  const runtime = `${hours}h ${mins}m`;

  return {
    id: raw.id,
    title: raw.title || raw.name || 'Untitled',
    year,
    rating: raw.vote_average ? parseFloat(raw.vote_average.toFixed(1)) : 7.8,
    genres: genres.length > 0 ? genres : ['Cinema'],
    poster,
    backdrop,
    synopsis: raw.overview || 'No synopsis provided for this title.',
    tagline: raw.tagline || undefined,
    runtime,
    releaseDate: raw.release_date
      ? new Date(raw.release_date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recently Released',
    director,
    cast:
      cast.length > 0
        ? cast
        : [
            {
              name: 'Ensemble Cast',
              role: 'Lead',
              photo:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
            },
          ],
    trailerYoutubeId,
  };
}

export async function fetchFromTmdb(endpoint: string, apiKey?: string, params: Record<string, string> = {}) {
  const key = getTmdbApiKey(apiKey);
  if (!key) {
    throw new Error('NO_KEY');
  }

  const queryParams = new URLSearchParams({
    api_key: key,
    language: 'en-US',
    ...params,
  });

  const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.status_message || `TMDB API error ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch newly released / now playing movies from TMDB
 */
export async function getLiveNowPlaying(apiKey?: string, page = 1): Promise<Movie[]> {
  const data = await fetchFromTmdb('/movie/now_playing', apiKey, { page: page.toString() });
  return (data.results || []).map(transformTmdbMovie);
}

/**
 * Fetch trending movies from TMDB
 */
export async function getLiveTrending(apiKey?: string, timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
  const data = await fetchFromTmdb(`/trending/movie/${timeWindow}`, apiKey);
  return (data.results || []).map(transformTmdbMovie);
}

/**
 * Fetch upcoming releases from TMDB
 */
export async function getLiveUpcoming(apiKey?: string, page = 1): Promise<Movie[]> {
  const data = await fetchFromTmdb('/movie/upcoming', apiKey, { page: page.toString() });
  return (data.results || []).map(transformTmdbMovie);
}

/**
 * Search movies live on TMDB
 */
export async function searchLiveMovies(query: string, apiKey?: string): Promise<Movie[]> {
  const data = await fetchFromTmdb('/search/movie', apiKey, { query, page: '1' });
  return (data.results || []).map(transformTmdbMovie);
}

/**
 * Fetch full movie details with cast, trailer video, and recommendations
 */
export async function getLiveMovieDetails(id: number | string, apiKey?: string): Promise<Movie | null> {
  try {
    const data = await fetchFromTmdb(`/movie/${id}`, apiKey, {
      append_to_response: 'credits,videos,similar',
    });
    return transformTmdbMovie(data);
  } catch {
    return null;
  }
}
