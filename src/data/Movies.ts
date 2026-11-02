export interface CastMember {
  name: string;
  role: string;
  photo: string;
}

export interface Movie {
  id: number;
  title: string;
  year: string;
  rating: number;
  genres: string[];
  poster: string;
  backdrop?: string;
  synopsis: string;
  tagline?: string;
  runtime: string;
  releaseDate: string;
  director: string;
  cast: CastMember[];
  trailerYoutubeId?: string;
}

// ── Trending data by tab ──
export const trendingMovies: Record<'now_playing' | 'trending' | 'toprated' | 'upcoming', Movie[]> = {
  now_playing: [
    {
      id: 301,
      title: 'Superman',
      year: '2025',
      rating: 8.4,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      poster: 'https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      synopsis:
        'Superman journeys to reconcile his Kryptonian heritage with his human upbringing as Clark Kent of Smallville, Kansas. He is the embodiment of truth, justice, and the human way in a world that views kindness as old-fashioned.',
      tagline: 'Look up in the sky.',
      runtime: '2h 20m',
      releaseDate: 'July 11, 2025',
      director: 'James Gunn',
      cast: [
        {
          name: 'David Corenswet',
          role: 'Clark Kent / Superman',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Rachel Brosnahan',
          role: 'Lois Lane',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Nicholas Hoult',
          role: 'Lex Luthor',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'uhUht6vAsMY',
    },
    {
      id: 302,
      title: 'Thunderbolts*',
      year: '2025',
      rating: 7.9,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNGUwZmYtODM0Yy00NjA3LTgxOGUtOTY0ZGM5MjBkM2I3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNDIzNGUwZmYtODM0Yy00NjA3LTgxOGUtOTY0ZGM5MjBkM2I3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'An unconventional group of antiheroes and reformed operatives — including Yelena Belova, Bucky Barnes, Ghost, and U.S. Agent — are brought together for high-stakes government covert operations.',
      tagline: 'Careful who you assemble.',
      runtime: '2h 12m',
      releaseDate: 'May 2, 2025',
      director: 'Jake Schreier',
      cast: [
        {
          name: 'Florence Pugh',
          role: 'Yelena Belova',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Sebastian Stan',
          role: 'Bucky Barnes',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'David Harbour',
          role: 'Red Guardian',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'hUUszE29jS0',
    },
    {
      id: 303,
      title: 'Mission: Impossible – The Final Reckoning',
      year: '2025',
      rating: 8.2,
      genres: ['Action', 'Adventure', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Hunt and the IMF team pursue a rogue artificial intelligence called the Entity that has infiltrated global intelligence networks, racing to prevent a catastrophic world order.',
      tagline: 'Our lives are the sum of our choices.',
      runtime: '2h 49m',
      releaseDate: 'May 23, 2025',
      director: 'Christopher McQuarrie',
      cast: [
        {
          name: 'Tom Cruise',
          role: 'Ethan Hunt',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Hayley Atwell',
          role: 'Grace',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Ving Rhames',
          role: 'Luther Stickell',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'NOhDyUmT9z0',
    },
    {
      id: 304,
      title: 'Sinners',
      year: '2025',
      rating: 7.8,
      genres: ['Horror', 'Drama', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Trying to leave their troubled lives behind, twin brothers return to their southern hometown to start anew, only to discover that an ancient and supernatural evil is waiting to welcome them back.',
      tagline: 'Dance with the devil.',
      runtime: '2h 17m',
      releaseDate: 'April 18, 2025',
      director: 'Ryan Coogler',
      cast: [
        {
          name: 'Michael B. Jordan',
          role: 'Smoke / Elijah',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Hailee Steinfeld',
          role: 'Mary',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Jack O\'Connell',
          role: 'The Preacher',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'bKGxHflevuk',
    },
    {
      id: 305,
      title: 'F1: The Movie',
      year: '2025',
      rating: 8.0,
      genres: ['Drama', 'Sport', 'Action'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNGI0MDI4NjEtOWU3ZS00ODQyLWFhYTgtNGYxM2ZkM2Q2YjE3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNGI0MDI4NjEtOWU3ZS00ODQyLWFhYTgtNGYxM2ZkM2Q2YjE3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'A veteran Formula One driver comes out of retirement to mentor a promising young rookie and compete for an underdog racing team against the giants of the sport.',
      tagline: 'Speed is just the beginning.',
      runtime: '2h 35m',
      releaseDate: 'June 27, 2025',
      director: 'Joseph Kosinski',
      cast: [
        {
          name: 'Brad Pitt',
          role: 'Sonny Hayes',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Damson Idris',
          role: 'Joshua Pearce',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Javier Bardem',
          role: 'Team Principal',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: '69ffwl-8pCU',
    },
    {
      id: 306,
      title: 'Captain America: Brave New World',
      year: '2025',
      rating: 7.7,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      synopsis:
        'Sam Wilson finds himself in the middle of an international incident and must discover the motive behind a nefarious global conspiracy before the mastermind sets the world on fire.',
      tagline: 'A new world demands a new hero.',
      runtime: '1h 58m',
      releaseDate: 'February 14, 2025',
      director: 'Julius Onah',
      cast: [
        {
          name: 'Anthony Mackie',
          role: 'Sam Wilson / Captain America',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Harrison Ford',
          role: 'Thaddeus "Thunderbolt" Ross',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Giancarlo Esposito',
          role: 'Sidewinder',
          photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: '1pHDWnXmK7Y',
    },
    {
      id: 307,
      title: 'Jurassic World: Rebirth',
      year: '2025',
      rating: 7.4,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNjg2NTcwYWQtYzk4NS00MTJhLWEzZjItMzIxNjk3YzlkYzU0XkEyXkFqcGc@._V1_QL75_UY562_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNjg2NTcwYWQtYzk4NS00MTJhLWEzZjItMzIxNjk3YzlkYzU0XkEyXkFqcGc@._V1_QL75_UY562_CR0,0,380,562_.jpg',
      synopsis:
        'Five years after global dinosaur dispersal, an elite expedition braves equatorial jungles to secure genetic material from the world\'s three largest prehistoric titans.',
      tagline: 'Life finds a new path.',
      runtime: '2h 13m',
      releaseDate: 'July 2, 2025',
      director: 'Gareth Edwards',
      cast: [
        {
          name: 'Scarlett Johansson',
          role: 'Zora Bennett',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Mahershala Ali',
          role: 'Duncan Kincaid',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Jonathan Bailey',
          role: 'Dr. Henry Loomis',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'jan5CFWs9ic',
    },
    {
      id: 308,
      title: 'A Minecraft Movie',
      year: '2025',
      rating: 7.3,
      genres: ['Action', 'Adventure', 'Comedy'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYzFjMzNjOTktNDBlNy00YWZhLWExYTctZDcxNDA4OWVhOTJjXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYzFjMzNjOTktNDBlNy00YWZhLWExYTctZDcxNDA4OWVhOTJjXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Four misfits are suddenly pulled through a mysterious portal into a cubic wonderland that thrives on imagination, teaming up with an eccentric master crafter named Steve.',
      tagline: 'Be there and be square.',
      runtime: '1h 41m',
      releaseDate: 'April 4, 2025',
      director: 'Jared Hess',
      cast: [
        {
          name: 'Jack Black',
          role: 'Steve',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Jason Momoa',
          role: 'Garrett "The Garbage Man" Garrison',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Emma Myers',
          role: 'Natalie',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'PE2YZhcC4NY',
    },
  ],
  trending: [
    {
      id: 1,
      title: 'Dune: Part Two',
      year: '2024',
      rating: 8.5,
      genres: ['Sci-Fi', 'Action'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Paul Atreides unites with the Fremen to wage war against the Harkonnen and prevent a terrible future only he can foresee.',
      tagline: 'Long live the fighters.',
      runtime: '2h 46m',
      releaseDate: 'March 1, 2024',
      director: 'Denis Villeneuve',
      cast: [
        {
          name: 'Timothée Chalamet',
          role: 'Paul Atreides',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Zendaya',
          role: 'Chani',
          photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Rebecca Ferguson',
          role: 'Lady Jessica',
          photo:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 2,
      title: 'Oppenheimer',
      year: '2023',
      rating: 8.9,
      genres: ['Drama', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
      tagline: 'The world forever changes.',
      runtime: '3h 0m',
      releaseDate: 'July 21, 2023',
      director: 'Christopher Nolan',
      cast: [
        {
          name: 'Cillian Murphy',
          role: 'J. Robert Oppenheimer',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Emily Blunt',
          role: 'Katherine Oppenheimer',
          photo:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Matt Damon',
          role: 'Leslie Groves',
          photo:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 3,
      title: 'Poor Things',
      year: '2023',
      rating: 8.1,
      genres: ['Comedy', 'Drama'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYWU2MjRjZTYtMjVkMS00MTBjLWFiMTAtYmZlYTk1YjkyMWFkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYWU2MjRjZTYtMjVkMS00MTBjLWFiMTAtYmZlYTk1YjkyMWFkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'The incredible tale of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
      tagline: 'Bliss follows bravery.',
      runtime: '2h 21m',
      releaseDate: 'December 8, 2023',
      director: 'Yorgos Lanthimos',
      cast: [
        {
          name: 'Emma Stone',
          role: 'Bella Baxter',
          photo:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Willem Dafoe',
          role: 'Dr. Godwin Baxter',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 4,
      title: 'The Batman',
      year: '2022',
      rating: 7.9,
      genres: ['Action', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate.',
      tagline: 'Vengeance.',
      runtime: '2h 56m',
      releaseDate: 'March 4, 2022',
      director: 'Matt Reeves',
      cast: [
        {
          name: 'Robert Pattinson',
          role: 'Bruce Wayne / Batman',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Zoë Kravitz',
          role: 'Selina Kyle',
          photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 5,
      title: 'Killers of the Flower Moon',
      year: '2023',
      rating: 7.7,
      genres: ['Drama', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BZWY5ZDVjNTUtODI5Yy00MjFhLWEyM2EtYzZjM2VjZTI0MTBjXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BZWY5ZDVjNTUtODI5Yy00MjFhLWEyM2EtYzZjM2VjZTI0MTBjXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      synopsis:
        'Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation.',
      tagline:
        'When oil was discovered in their land, the Osage Nation became the wealthiest people per capita in the world.',
      runtime: '3h 26m',
      releaseDate: 'October 20, 2023',
      director: 'Martin Scorsese',
      cast: [
        {
          name: 'Leonardo DiCaprio',
          role: 'Ernest Burkhart',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Lily Gladstone',
          role: 'Mollie Burkhart',
          photo:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 6,
      title: 'Past Lives',
      year: '2023',
      rating: 8.0,
      genres: ['Drama', 'Romance'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYjQyMTNhNjUtN2VmYy00NWRhLTkwOTctMGVmNTBmNDIxYjZhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYjQyMTNhNjUtN2VmYy00NWRhLTkwOTctMGVmNTBmNDIxYjZhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Two childhood sweethearts who are separated in Korea reunite in New York City two decades later, reflecting on their past and what could have been.',
      tagline: "Some things can't be undone.",
      runtime: '1h 46m',
      releaseDate: 'June 2, 2023',
      director: 'Celine Song',
      cast: [
        {
          name: 'Greta Lee',
          role: 'Nora Moon',
          photo:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Teo Yoo',
          role: 'Hae Sung',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 7,
      title: 'Barbie',
      year: '2023',
      rating: 7.0,
      genres: ['Comedy', 'Drama'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYjI3NDU0ZGYtYjA2YS00Y2RlLTgwZDAtYTE2YTM5ZjE1M2JlXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYjI3NDU0ZGYtYjA2YS00Y2RlLTgwZDAtYTE2YTM5ZjE1M2JlXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
      tagline: "She's everything. He's just Ken.",
      runtime: '1h 54m',
      releaseDate: 'July 21, 2023',
      director: 'Greta Gerwig',
      cast: [
        {
          name: 'Margot Robbie',
          role: 'Barbie',
          photo:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Ryan Gosling',
          role: 'Ken',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 8,
      title: 'Inception',
      year: '2010',
      rating: 8.8,
      genres: ['Sci-Fi', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      tagline: 'Your mind is the scene of the crime.',
      runtime: '2h 28m',
      releaseDate: 'July 16, 2010',
      director: 'Christopher Nolan',
      cast: [
        {
          name: 'Leonardo DiCaprio',
          role: 'Dom Cobb',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Joseph Gordon-Levitt',
          role: 'Arthur',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
  ],

  toprated: [
    {
      id: 9,
      title: 'The Shawshank Redemption',
      year: '1994',
      rating: 9.3,
      genres: ['Drama'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      synopsis:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      tagline: 'Fear can hold you prisoner. Hope can set you free.',
      runtime: '2h 22m',
      releaseDate: 'September 23, 1994',
      director: 'Frank Darabont',
      cast: [
        {
          name: 'Tim Robbins',
          role: 'Andy Dufresne',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Morgan Freeman',
          role: 'Ellis Boyd "Red" Redding',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 10,
      title: 'The Godfather',
      year: '1972',
      rating: 9.2,
      genres: ['Drama', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_QL75_UY562_CR8,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_QL75_UY562_CR8,0,380,562_.jpg',
      synopsis:
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      tagline: "An offer you can't refuse.",
      runtime: '2h 55m',
      releaseDate: 'March 24, 1972',
      director: 'Francis Ford Coppola',
      cast: [
        {
          name: 'Marlon Brando',
          role: 'Don Vito Corleone',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Al Pacino',
          role: 'Michael Corleone',
          photo:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 11,
      title: "Schindler's List",
      year: '1993',
      rating: 9.0,
      genres: ['Drama', 'Horror'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
      synopsis:
        'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.',
      tagline: 'Whoever saves one life, saves the world entire.',
      runtime: '3h 15m',
      releaseDate: 'December 15, 1993',
      director: 'Steven Spielberg',
      cast: [
        {
          name: 'Liam Neeson',
          role: 'Oskar Schindler',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Ralph Fiennes',
          role: 'Amon Göth',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 12,
      title: 'Parasite',
      year: '2019',
      rating: 8.6,
      genres: ['Thriller', 'Drama', 'Comedy'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      tagline: 'Act like you own the place.',
      runtime: '2h 12m',
      releaseDate: 'November 8, 2019',
      director: 'Bong Joon-ho',
      cast: [
        {
          name: 'Song Kang-ho',
          role: 'Kim Ki-taek',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Lee Sun-kyun',
          role: 'Park Dong-ik',
          photo:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 13,
      title: 'Interstellar',
      year: '2014',
      rating: 8.7,
      genres: ['Sci-Fi', 'Drama'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      tagline: 'Mankind was born on Earth. It was never meant to die here.',
      runtime: '2h 49m',
      releaseDate: 'November 7, 2014',
      director: 'Christopher Nolan',
      cast: [
        {
          name: 'Matthew McConaughey',
          role: 'Cooper',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Anne Hathaway',
          role: 'Brand',
          photo:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 14,
      title: 'The Dark Knight',
      year: '2008',
      rating: 9.0,
      genres: ['Action', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      tagline: 'Why so serious?',
      runtime: '2h 32m',
      releaseDate: 'July 18, 2008',
      director: 'Christopher Nolan',
      cast: [
        {
          name: 'Christian Bale',
          role: 'Bruce Wayne / Batman',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Heath Ledger',
          role: 'The Joker',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 15,
      title: 'Spirited Away',
      year: '2001',
      rating: 8.6,
      genres: ['Animation', 'Drama'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
      tagline: 'The tunnel led Chihiro to a magical world.',
      runtime: '2h 5m',
      releaseDate: 'July 20, 2001',
      director: 'Hayao Miyazaki',
      cast: [
        {
          name: 'Daveigh Chase',
          role: 'Chihiro (voice)',
          photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Suzanne Pleshette',
          role: 'Yubaba (voice)',
          photo:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 16,
      title: 'Whiplash',
      year: '2014',
      rating: 8.5,
      genres: ['Drama', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMDFjOWFkYzktYzhhMC00NmYyLTkwY2EtYjViMDhmNzg0OGFkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMDFjOWFkYzktYzhhMC00NmYyLTkwY2EtYjViMDhmNzg0OGFkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an abusive instructor.',
      tagline: 'The road to greatness can take you to the edge.',
      runtime: '1h 46m',
      releaseDate: 'October 10, 2014',
      director: 'Damien Chazelle',
      cast: [
        {
          name: 'Miles Teller',
          role: 'Andrew Neiman',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'J.K. Simmons',
          role: 'Terence Fletcher',
          photo:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
  ],

  upcoming: [
    {
      id: 201,
      title: 'The Odyssey',
      year: '2026',
      rating: 8.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNTcyNmJlZmQtNDUwYy00NDBjLTg1NGQtYTY2Y2UxMWM3NmI1XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNTcyNmJlZmQtNDUwYy00NDBjLTg1NGQtYTY2Y2UxMWM3NmI1XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'After the grueling Trojan War, King Odysseus embarks on a legendary voyage back to Ithaca, facing mythological creatures, ancient gods, and treacherous seas in an epic cinematic vision by Christopher Nolan.',
      tagline: 'The journey home is the ultimate battle.',
      runtime: '2h 52m',
      releaseDate: 'July 17, 2026',
      director: 'Christopher Nolan',
      cast: [
        {
          name: 'Matt Damon',
          role: 'Odysseus',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Tom Holland',
          role: 'Telemachus',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Anne Hathaway',
          role: 'Penelope',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'Mzw2ttJD2qQ',
    },
    {
      id: 207,
      title: 'Avengers: Doomsday',
      year: '2026',
      rating: 8.9,
      genres: ['Action', 'Sci-Fi', 'Adventure'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMTdlMDgxNjAtNjkxOC00ZDYxLTg3MDEtZmIwZjIxOGMwYjVkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMTdlMDgxNjAtNjkxOC00ZDYxLTg3MDEtZmIwZjIxOGMwYjVkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Earth\'s mightiest heroes and allies across the multiverse must unite against their greatest existential threat yet: Victor von Doom, who wields terrifying power to remake reality itself.',
      tagline: 'All hope lies in Doom.',
      runtime: '2h 55m',
      releaseDate: 'May 1, 2026',
      director: 'Anthony Russo, Joe Russo',
      cast: [
        {
          name: 'Robert Downey Jr.',
          role: 'Victor von Doom / Doctor Doom',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Benedict Cumberbatch',
          role: 'Doctor Strange',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Tom Holland',
          role: 'Peter Parker / Spider-Man',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'TcMBFSGVi1c',
    },
    {
      id: 208,
      title: 'The Batman: Part II',
      year: '2026',
      rating: 8.5,
      genres: ['Crime', 'Drama', 'Mystery'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMTU2NzhiYWUtYThlZi00OWIyLTk3YWEtZjY3NmJjOTZiZDAyXkEyXkFqcGc@._V1_SX300.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BMTU2NzhiYWUtYThlZi00OWIyLTk3YWEtZjY3NmJjOTZiZDAyXkEyXkFqcGc@._V1_SX300.jpg',
      synopsis:
        'Bruce Wayne ventures deeper into the criminal underworld of Gotham City as power vacuums emerge and corruption festers in the wake of the citywide catastrophe.',
      tagline: 'The shadows grow longer.',
      runtime: '2h 45m',
      releaseDate: 'October 2, 2026',
      director: 'Matt Reeves',
      cast: [
        {
          name: 'Robert Pattinson',
          role: 'Bruce Wayne / Batman',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Andy Serkis',
          role: 'Alfred Pennyworth',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Colin Farrell',
          role: 'Oswald Cobblepot / The Penguin',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'mqqft2x_Aa4',
    },
    {
      id: 209,
      title: 'Tron: Ares',
      year: '2025',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      poster: 'https://m.media-amazon.com/images/M/MV5BYzNlY2RiYWEtMDA0YS00MTZkLWI5YmUtMDNiZDZlN2E4MTVlXkEyXkFqcGc@._V1_QL75_UY562_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BYzNlY2RiYWEtMDA0YS00MTZkLWI5YmUtMDNiZDZlN2E4MTVlXkEyXkFqcGc@._V1_QL75_UY562_CR0,0,380,562_.jpg',
      synopsis:
        'A highly sophisticated digital program, Ares, is sent from the digital grid into the real human world on a dangerous, reality-altering mission.',
      tagline: 'Enter the Grid once more.',
      runtime: '1h 59m',
      releaseDate: 'October 10, 2025',
      director: 'Joachim Rønning',
      cast: [
        {
          name: 'Jared Leto',
          role: 'Ares',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Greta Lee',
          role: 'Eve Kim',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Jeff Bridges',
          role: 'Kevin Flynn',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'YShVEXb7-ic',
    },
    {
      id: 210,
      title: '28 Years Later',
      year: '2025',
      rating: 8.0,
      genres: ['Horror', 'Sci-Fi', 'Thriller'],
      poster: 'https://m.media-amazon.com/images/M/MV5BNjgwYTI0YjctMWYzNS00MmI1LWI5YTctNmE1YjBkNDFlNWMxXkEyXkFqcGc@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BNjgwYTI0YjctMWYzNS00MmI1LWI5YTctNmE1YjBkNDFlNWMxXkEyXkFqcGc@._V1_QL75_UY562_CR35,0,380,562_.jpg',
      synopsis:
        'Nearly three decades after the original outbreak of the Rage virus, survivors living on an isolated island must confront newly mutated horrors when an expedition to the mainland goes awry.',
      tagline: 'The rage never dies.',
      runtime: '1h 55m',
      releaseDate: 'June 20, 2025',
      director: 'Danny Boyle',
      cast: [
        {
          name: 'Jodie Comer',
          role: 'Lead Survivor',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Aaron Taylor-Johnson',
          role: 'Scout Captain',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Ralph Fiennes',
          role: 'Commander',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'mcvLKldPM08',
    },
    {
      id: 206,
      title: 'Avatar: Fire and Ash',
      year: '2025',
      rating: 8.6,
      genres: ['Sci-Fi', 'Action', 'Adventure'],
      poster: 'https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      backdrop: 'https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
      synopsis:
        'Jake Sully and Neytiri travel to uncharted regions of Pandora, discovering the volatile volcanic territories of the "Ash People" — a hostile Na\'vi clan that tests their convictions and family unity to the limit.',
      tagline: 'Return to Pandora.',
      runtime: '3h 10m',
      releaseDate: 'December 19, 2025',
      director: 'James Cameron',
      cast: [
        {
          name: 'Sam Worthington',
          role: 'Jake Sully',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Zoe Saldana',
          role: 'Neytiri',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Oona Chaplin',
          role: 'Varang',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
      ],
      trailerYoutubeId: 'nb_fFj_0rq8',
    },
  ],
};

// ── All movies for genre grid ──
export const allMovies: Movie[] = [
  ...trendingMovies.now_playing,
  ...trendingMovies.trending,
  ...trendingMovies.toprated,
  ...trendingMovies.upcoming,
];

// ── Featured movie for detail section ──
export const featuredMovie: Movie = {
  id: 101,
  title: 'Dune: Part Two',
  year: '2024',
  rating: 8.5,
  genres: ['Sci-Fi', 'Action', 'Drama'],
  poster:
    'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
  backdrop:
    'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1920_.jpg',
  synopsis:
    'Paul Atreides unites with the Fremen people of Arrakis as he embraces his destiny and leads a holy war to liberate the desert planet. Continuing his journey from the first film, Paul must navigate complex political intrigue, mystical prophecy, and a growing love for Chani as he becomes the messianic figure the Fremen have long awaited — all while the Harkonnen empire tightens its grip on the spice trade.',
  tagline: 'Long live the fighters.',
  runtime: '2h 46m',
  releaseDate: 'March 1, 2024',
  director: 'Denis Villeneuve',
  cast: [
    {
      name: 'Timothée Chalamet',
      role: 'Paul Atreides',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Zendaya',
      role: 'Chani',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Rebecca Ferguson',
      role: 'Lady Jessica',
      photo:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Austin Butler',
      role: 'Feyd-Rautha',
      photo:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Florence Pugh',
      role: 'Princess Irulan',
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Josh Brolin',
      role: 'Gurney Halleck',
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    },
  ],
};

// ── Curated YouTube Trailer Video IDs (All Verified Embeddable) ──
export const TRAILER_MAP: Record<string, string> = {
  'Superman': 'uhUht6vAsMY',
  'Thunderbolts*': 'hUUszE29jS0',
  'Mission: Impossible – The Final Reckoning': 'NOhDyUmT9z0',
  'Sinners': 'bKGxHflevuk',
  'F1: The Movie': '69ffwl-8pCU',
  'Captain America: Brave New World': '1pHDWnXmK7Y',
  'Jurassic World: Rebirth': 'jan5CFWs9ic',
  'A Minecraft Movie': 'PE2YZhcC4NY',
  'Dune: Part Two': 'Way9Dexny3w',
  'Oppenheimer': 'uYPbbksJxIg',
  'Poor Things': 'RlbR5N6veqw',
  'The Batman': 'mqqft2x_Aa4',
  'Killers of the Flower Moon': 'EP34Yoxs3FQ',
  'Past Lives': 'kA244xewjcI',
  'Barbie': 'pBk4NYhWNMM',
  'Inception': 'YoHD9XEInc0',
  'The Shawshank Redemption': 'PLl99DlL6b4',
  'The Godfather': 'UaVTIH8mujA',
  "Schindler's List": 'mxphAlJID9U',
  'Parasite': 'isOGD_7hNIY',
  'Interstellar': 'zSWdZVtXT7E',
  'The Dark Knight': 'EXeTwQWrcwY',
  'Spirited Away': 'ByXuk9QqQkk',
  'Whiplash': '7d_jQycdQGo',
  'Gladiator II': '4rgYUipGJNo',
  'Wicked': '6COmYeLsz4c',
  'Alien: Romulus': 'x0XDEhP4MQs',
  'Deadpool & Wolverine': '73_1biulkYk',
  'A Quiet Place: Day One': 'YPY7J-flzE8',
  'Inside Out 2': 'LEjhY15eCx0',
  'Twisters': 'wdok0rZdmx4',
  'Kingdom of the Planet of the Apes': 'XtFI7SNtVpY',
  'Beetlejuice Beetlejuice': 'CoZqL9N6Rx4',
  'The Substance': 'LNlrGhBpYjc',
  'Moana 2': 'hDZ7y8RP5HE',
  'Nosferatu': 'nulvWqYUM8k',
  'The Odyssey': 'Mzw2ttJD2qQ',
  'Avengers: Doomsday': 'TcMBFSGVi1c',
  'The Batman: Part II': 'mqqft2x_Aa4',
  'Tron: Ares': 'YShVEXb7-ic',
  '28 Years Later': 'mcvLKldPM08',
  'Avatar: Fire and Ash': 'nb_fFj_0rq8',
};

export function getMovieTrailerId(movie?: Movie | null): string {
  if (!movie) return 'Way9Dexny3w';
  if (movie.trailerYoutubeId && movie.trailerYoutubeId.trim().length === 11) {
    return movie.trailerYoutubeId.trim();
  }
  if (TRAILER_MAP[movie.title]) {
    return TRAILER_MAP[movie.title];
  }
  // Try case-insensitive lookup
  const lowerTitle = movie.title.toLowerCase();
  const matchedKey = Object.keys(TRAILER_MAP).find(k => k.toLowerCase() === lowerTitle);
  if (matchedKey) return TRAILER_MAP[matchedKey];

  return 'Way9Dexny3w'; // Guaranteed valid Dune 2 trailer fallback
}

export function getMovieDirectTrailerUrl(movie?: Movie | null): string {
  if (!movie) return 'https://www.youtube.com/watch?v=Way9Dexny3w';
  const id = getMovieTrailerId(movie);
  if (id) {
    return `https://www.youtube.com/watch?v=${id}`;
  }
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer ' + movie.year)}`;
}

export function getMovieById(id: number | string): Movie | undefined {
  const numericId = Number(id);
  if (featuredMovie.id === numericId) return featuredMovie;
  return allMovies.find((m) => m.id === numericId);
}

export function getSimilarMovies(movieId: number, limit = 5): Movie[] {
  const current = getMovieById(movieId);
  if (!current) return allMovies.slice(0, limit);
  const matched = allMovies.filter(
    (m) => m.id !== current.id && m.genres.some((g) => current.genres.includes(g))
  );
  return (matched.length > 0 ? matched : allMovies.filter((m) => m.id !== current.id)).slice(0, limit);
}

export function searchMovies(query: string): Movie[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allMovies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(q) ||
      movie.director.toLowerCase().includes(q) ||
      movie.genres.some((g) => g.toLowerCase().includes(q)) ||
      movie.cast.some((c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)) ||
      movie.year.includes(q)
    );
  });
}

