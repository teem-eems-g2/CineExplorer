import { type Movie, type CastMember } from '@/data/Movies';

const OMDB_API_KEY = 'trilogy';
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

export async function searchOmdb(query: string): Promise<Movie[]> {
  const q = query.trim();
  if (!q) return [];

  try {
    const searchUrl = `${OMDB_BASE_URL}?s=${encodeURIComponent(q)}&apikey=${OMDB_API_KEY}`;
    const res = await fetch(searchUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const data = await res.json();
    if (data.Response === 'True' && Array.isArray(data.Search)) {
      const movies: Movie[] = data.Search.map((item: any, idx: number) => {
        const numId = parseInt(item.imdbID.replace(/\D/g, ''), 10) || 800000 + idx;
        const poster =
          item.Poster && item.Poster !== 'N/A'
            ? item.Poster
            : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

        return {
          id: numId,
          title: item.Title,
          year: item.Year,
          rating: 7.8,
          genres: [item.Type === 'series' ? 'TV Series' : 'Cinema', 'Drama'],
          poster,
          backdrop: poster,
          synopsis: `Experience "${item.Title}" (${item.Year}). Watch official trailers, ratings, and cast details on CineExplorer.`,
          runtime: 'Feature Film',
          releaseDate: item.Year,
          director: 'Acclaimed Director',
          cast: [
            {
              name: 'Leading Cast',
              role: 'Protagonist',
              photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
            },
          ],
        };
      });

      // If the query is an exact title, try to fetch the first movie's rich plot & director
      if (movies.length > 0 && movies[0].id) {
        try {
          const detailRes = await fetch(
            `${OMDB_BASE_URL}?i=tt${movies[0].id.toString().padStart(7, '0')}&apikey=${OMDB_API_KEY}`
          );
          if (detailRes.ok) {
            const detailData = await detailRes.json();
            if (detailData.Response === 'True') {
              if (detailData.Plot && detailData.Plot !== 'N/A') movies[0].synopsis = detailData.Plot;
              if (detailData.Director && detailData.Director !== 'N/A') movies[0].director = detailData.Director;
              if (detailData.Runtime && detailData.Runtime !== 'N/A') movies[0].runtime = detailData.Runtime;
              if (detailData.imdbRating && detailData.imdbRating !== 'N/A') movies[0].rating = parseFloat(detailData.imdbRating);
              if (detailData.Genre && detailData.Genre !== 'N/A') {
                movies[0].genres = detailData.Genre.split(', ').map((g: string) => g.trim());
              }
              if (detailData.Actors && detailData.Actors !== 'N/A') {
                movies[0].cast = detailData.Actors.split(', ').map((name: string) => ({
                  name: name.trim(),
                  role: 'Actor',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                }));
              }
            }
          }
        } catch {}
      }

      return movies;
    }
  } catch (err) {
    console.error('OMDB search failed:', err);
  }

  return [];
}

export async function getOmdbMovieDetails(idOrImdb: string | number): Promise<Movie | null> {
  try {
    const raw = idOrImdb.toString();
    const imdbId = raw.startsWith('tt') ? raw : `tt${raw.padStart(7, '0')}`;
    const url = `${OMDB_BASE_URL}?i=${imdbId}&apikey=${OMDB_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.Response === 'True') {
      const numId = parseInt(data.imdbID.replace(/\D/g, ''), 10) || 888888;
      const poster =
        data.Poster && data.Poster !== 'N/A'
          ? data.Poster
          : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
      const genres =
        data.Genre && data.Genre !== 'N/A'
          ? data.Genre.split(', ').map((g: string) => g.trim())
          : ['Cinema'];
      const cast: CastMember[] =
        data.Actors && data.Actors !== 'N/A'
          ? data.Actors.split(', ').map((name: string) => ({
              name: name.trim(),
              role: 'Cast',
              photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
            }))
          : [
              {
                name: 'Ensemble Cast',
                role: 'Lead',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
              },
            ];

      return {
        id: numId,
        title: data.Title,
        year: data.Year,
        rating: data.imdbRating && data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : 7.5,
        genres,
        poster,
        backdrop: poster,
        synopsis: data.Plot && data.Plot !== 'N/A' ? data.Plot : 'No synopsis available for this title.',
        tagline: data.Awards && data.Awards !== 'N/A' ? data.Awards : undefined,
        runtime: data.Runtime && data.Runtime !== 'N/A' ? data.Runtime : '2h 00m',
        releaseDate: data.Released && data.Released !== 'N/A' ? data.Released : data.Year,
        director: data.Director && data.Director !== 'N/A' ? data.Director : 'Various Directors',
        cast,
      };
    }
  } catch (err) {
    console.error('OMDB detail failed:', err);
  }

  return null;
}
