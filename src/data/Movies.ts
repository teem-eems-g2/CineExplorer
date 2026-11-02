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
}

// ── Trending data by tab ──
export const trendingMovies: Record<'trending' | 'toprated' | 'upcoming', Movie[]> = {
  trending: [
    {
      id: 1,
      title: 'Dune: Part Two',
      year: '2024',
      rating: 8.5,
      genres: ['Sci-Fi', 'Action'],
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_10a66bff9-1774132189408.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_10a66bff9-1774132189408.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a09e6381-1766870073769.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a09e6381-1766870073769.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_11a4e6e32-1772072563391.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_11a4e6e32-1772072563391.png',
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
      poster: 'https://images.unsplash.com/photo-1623756042219-4ba48458b658',
      backdrop: 'https://images.unsplash.com/photo-1623756042219-4ba48458b658',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_147f94114-1774132191075.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_147f94114-1774132191075.png',
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
      poster: 'https://images.unsplash.com/photo-1713282505532-e8b241bc0b5a',
      backdrop: 'https://images.unsplash.com/photo-1713282505532-e8b241bc0b5a',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c5849461-1774132190763.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c5849461-1774132190763.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_160bb1f04-1772705482124.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_160bb1f04-1772705482124.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_136c7f65e-1774132188689.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_136c7f65e-1774132188689.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1df6eee9b-1766888766336.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1df6eee9b-1766888766336.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1499c97ef-1774132188736.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1499c97ef-1774132188736.png',
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
      poster: 'https://images.unsplash.com/photo-1722352164204-789a1201f6af',
      backdrop: 'https://images.unsplash.com/photo-1722352164204-789a1201f6af',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a71c81d0-1764681696820.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a71c81d0-1764681696820.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_11f2ae33d-1771597923255.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_11f2ae33d-1771597923255.png',
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
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bbcc2a37-1774132190089.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bbcc2a37-1774132190089.png',
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
      poster: 'https://images.unsplash.com/photo-1582519768971-2a2f567a76bd',
      backdrop: 'https://images.unsplash.com/photo-1582519768971-2a2f567a76bd',
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
      id: 17,
      title: 'Gladiator II',
      year: '2024',
      rating: 7.4,
      genres: ['Action', 'Drama'],
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1584d69d3-1774132189354.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1584d69d3-1774132189354.png',
      synopsis:
        'Years after witnessing the death of the revered hero Maximus at the hands of the corrupt Emperor Commodus, Lucius must enter the Colosseum.',
      tagline: 'What we do in life echoes in eternity.',
      runtime: '2h 28m',
      releaseDate: 'November 22, 2024',
      director: 'Ridley Scott',
      cast: [
        {
          name: 'Paul Mescal',
          role: 'Lucius',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Denzel Washington',
          role: 'Macrinus',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 18,
      title: 'Wicked',
      year: '2024',
      rating: 7.8,
      genres: ['Drama', 'Romance'],
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1133531ce-1774132189880.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1133531ce-1774132189880.png',
      synopsis:
        'The untold story of the witches of Oz: a young woman, born with emerald-green skin, who is smart and misunderstood.',
      tagline: 'Everyone deserves the chance to fly.',
      runtime: '2h 40m',
      releaseDate: 'November 22, 2024',
      director: 'Jon M. Chu',
      cast: [
        {
          name: 'Cynthia Erivo',
          role: 'Elphaba',
          photo:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Ariana Grande',
          role: 'Glinda',
          photo:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 19,
      title: 'Alien: Romulus',
      year: '2024',
      rating: 7.3,
      genres: ['Sci-Fi', 'Horror'],
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d737a23c-1774132189881.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d737a23c-1774132189881.png',
      synopsis:
        'A group of young people on a distant world find themselves in a confrontation with the most terrifying life form in the universe.',
      tagline: 'Do not fear the dark.',
      runtime: '1h 59m',
      releaseDate: 'August 16, 2024',
      director: 'Fede Álvarez',
      cast: [
        {
          name: 'Cailee Spaeny',
          role: 'Rain Carradine',
          photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'David Jonsson',
          role: 'Andy',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 20,
      title: 'Deadpool & Wolverine',
      year: '2024',
      rating: 7.9,
      genres: ['Action', 'Comedy'],
      poster: 'https://images.unsplash.com/photo-1728661354047-9365a447a92b',
      backdrop: 'https://images.unsplash.com/photo-1728661354047-9365a447a92b',
      synopsis:
        'Deadpool is offered a chance to join the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine.',
      tagline: 'Come together.',
      runtime: '2h 7m',
      releaseDate: 'July 26, 2024',
      director: 'Shawn Levy',
      cast: [
        {
          name: 'Ryan Reynolds',
          role: 'Wade Wilson / Deadpool',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Hugh Jackman',
          role: 'Logan / Wolverine',
          photo:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 21,
      title: 'A Quiet Place: Day One',
      year: '2024',
      rating: 6.9,
      genres: ['Horror', 'Sci-Fi'],
      poster: 'https://images.unsplash.com/photo-1644873643690-15f9995d9474',
      backdrop: 'https://images.unsplash.com/photo-1644873643690-15f9995d9474',
      synopsis:
        'Experience the day the world went quiet — the origin story of how the invasion of Earth began.',
      tagline: 'Silence is survival.',
      runtime: '1h 39m',
      releaseDate: 'June 28, 2024',
      director: 'Michael Sarnoski',
      cast: [
        {
          name: "Lupita Nyong'o",
          role: 'Samira',
          photo:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Joseph Quinn',
          role: 'Eric',
          photo:
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 22,
      title: 'Inside Out 2',
      year: '2024',
      rating: 7.8,
      genres: ['Animation', 'Comedy'],
      poster: 'https://img.rocket.new/generatedImages/rocket_gen_img_2a3509e27-1774132195264.png',
      backdrop: 'https://img.rocket.new/generatedImages/rocket_gen_img_2a3509e27-1774132195264.png',
      synopsis:
        'Follow Riley in her teenage years as new Emotions join the mix and must work alongside Joy, Sadness, Anger, Fear and Disgust.',
      tagline: 'Make room for new emotions.',
      runtime: '1h 40m',
      releaseDate: 'June 14, 2024',
      director: 'Kelsey Mann',
      cast: [
        {
          name: 'Amy Poehler',
          role: 'Joy (voice)',
          photo:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Maya Hawke',
          role: 'Anxiety (voice)',
          photo:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 23,
      title: 'Twisters',
      year: '2024',
      rating: 7.2,
      genres: ['Action', 'Drama'],
      poster: 'https://images.unsplash.com/photo-1696831387912-dc6ecab2b892',
      backdrop: 'https://images.unsplash.com/photo-1696831387912-dc6ecab2b892',
      synopsis:
        'Kate, a former storm chaser haunted by a devastating encounter with a tornado, is lured back to the open plains by her friend Javi.',
      tagline: 'See it on the big screen.',
      runtime: '2h 2m',
      releaseDate: 'July 19, 2024',
      director: 'Lee Isaac Chung',
      cast: [
        {
          name: 'Daisy Edgar-Jones',
          role: 'Kate Carter',
          photo:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Glen Powell',
          role: 'Tyler Owens',
          photo:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
    {
      id: 24,
      title: 'Kingdom of the Planet of the Apes',
      year: '2024',
      rating: 7.0,
      genres: ['Sci-Fi', 'Action'],
      poster: 'https://images.unsplash.com/photo-1712038330956-6557ea6bb641',
      backdrop: 'https://images.unsplash.com/photo-1712038330956-6557ea6bb641',
      synopsis:
        'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he was taught.',
      tagline: 'No one can stop the kingdom.',
      runtime: '2h 25m',
      releaseDate: 'May 10, 2024',
      director: 'Wes Ball',
      cast: [
        {
          name: 'Owen Teague',
          role: 'Noa',
          photo:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        },
        {
          name: 'Freya Allan',
          role: 'Mae',
          photo:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        },
      ],
    },
  ],
};

// ── All movies for genre grid ──
export const allMovies: Movie[] = [
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
    'https://images.unsplash.com/photo-1446776709462-d6af6cbe6d93?auto=format&fit=crop&w=600&q=80',
  backdrop:
    'https://images.unsplash.com/photo-1446776709462-d6af6cbe6d93?auto=format&fit=crop&w=1600&q=80',
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
