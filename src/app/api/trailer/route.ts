import { NextRequest, NextResponse } from 'next/server';
import { TRAILER_MAP } from '@/data/Movies';
import { getLiveMovieDetails } from '@/lib/tmdb';

// In-memory cache for dynamic trailer lookups across the server lifecycle
const trailerCache = new Map<string, string>();

async function scrapeYouTubeTrailer(title: string, year?: string): Promise<string | null> {
  const query = `${title} ${year || ''} official trailer`.trim();
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const response = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const html = await response.text();
    // YouTube embeds video IDs in /watch?v=XXXXXXXXXXX
    const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map((m) => m[1]);
    const unique = [...new Set(matches)];

    if (unique.length > 0) {
      return unique[0];
    }
  } catch {
    // Network or abort error
  }

  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') || '').trim();
  const year = (searchParams.get('year') || '').trim();
  const id = searchParams.get('id');
  const customKey = request.headers.get('x-tmdb-key') || searchParams.get('key') || undefined;

  if (!title) {
    return NextResponse.json({ error: 'Title parameter is required' }, { status: 400 });
  }

  const cacheKey = `${title.toLowerCase()}_${year}`.trim();

  // 1. Check in-memory cache
  if (trailerCache.has(cacheKey)) {
    const cachedId = trailerCache.get(cacheKey)!;
    return NextResponse.json({
      ok: true,
      trailerId: cachedId,
      title,
      year,
      embedUrl: `https://www.youtube.com/embed/${cachedId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`,
      directUrl: `https://www.youtube.com/watch?v=${cachedId}`,
      source: 'cache',
    });
  }

  // 2. Check local curated map (exact or case-insensitive)
  if (TRAILER_MAP[title]) {
    const trailerId = TRAILER_MAP[title];
    trailerCache.set(cacheKey, trailerId);
    return NextResponse.json({
      ok: true,
      trailerId,
      title,
      year,
      embedUrl: `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`,
      directUrl: `https://www.youtube.com/watch?v=${trailerId}`,
      source: 'curated',
    });
  }

  const lowerTitle = title.toLowerCase();
  const matchedCuratedKey = Object.keys(TRAILER_MAP).find((k) => k.toLowerCase() === lowerTitle);
  if (matchedCuratedKey) {
    const trailerId = TRAILER_MAP[matchedCuratedKey];
    trailerCache.set(cacheKey, trailerId);
    return NextResponse.json({
      ok: true,
      trailerId,
      title,
      year,
      embedUrl: `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`,
      directUrl: `https://www.youtube.com/watch?v=${trailerId}`,
      source: 'curated',
    });
  }

  // 3. Check TMDB if numeric ID is provided
  if (id && !isNaN(Number(id))) {
    try {
      const details = await getLiveMovieDetails(Number(id), customKey);
      if (details?.trailerYoutubeId) {
        const trailerId = details.trailerYoutubeId;
        trailerCache.set(cacheKey, trailerId);
        return NextResponse.json({
          ok: true,
          trailerId,
          title,
          year,
          embedUrl: `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`,
          directUrl: `https://www.youtube.com/watch?v=${trailerId}`,
          source: 'tmdb',
        });
      }
    } catch {
      // Continue to live search
    }
  }

  // 4. Live YouTube Search Scraper
  const scrapedId = await scrapeYouTubeTrailer(title, year);
  if (scrapedId) {
    trailerCache.set(cacheKey, scrapedId);
    return NextResponse.json({
      ok: true,
      trailerId: scrapedId,
      title,
      year,
      embedUrl: `https://www.youtube.com/embed/${scrapedId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`,
      directUrl: `https://www.youtube.com/watch?v=${scrapedId}`,
      source: 'youtube_live',
    });
  }

  // 5. Intelligent Fallback: YouTube Search Playlist Embed
  // YouTube natively supports embed?listType=search&list=QUERY which loads the top video for that search
  const searchQuery = `${title} ${year || ''} official trailer`.trim();
  const searchEmbed = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
    searchQuery
  )}&autoplay=1&rel=0&modestbranding=1`;
  const directSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return NextResponse.json({
    ok: false,
    trailerId: null,
    title,
    year,
    embedUrl: searchEmbed,
    directUrl: directSearchUrl,
    source: 'youtube_search_embed',
  });
}
