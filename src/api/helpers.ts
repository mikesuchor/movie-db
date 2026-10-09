interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  popularity?: number;
}

interface Trailer {
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// Poster image URL, or a placeholder for movies TMDB has no poster for
export const posterUrl = (posterPath: string | null) =>
  posterPath
    ? `https://image.tmdb.org/t/p/w342${posterPath}`
    : `${import.meta.env.BASE_URL}poster-placeholder.svg`;

// TMDB lists videos in no useful order, so prefer official YouTube trailers,
// then trailers, then teasers, then anything else on YouTube
export const pickTrailer = (videos: Trailer[] = []) => {
  const rank = (video: Trailer) =>
    (video.type === 'Trailer' ? 0 : video.type === 'Teaser' ? 2 : 4) +
    (video.official ? 0 : 1);

  return videos
    .filter((video: Trailer) => video.site === 'YouTube')
    .sort((a, b) => rank(a) - rank(b))[0];
};

// TMDB ratings come with up to three decimals (8.198); show one (8.2)
export const formatRating = (rating: number) => Number(rating || 0).toFixed(1);

export const backdropUrl = (backdropPath: string | null) =>
  backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : '';

export const releaseYear = (movie: Movie) =>
  (movie.release_date || '').slice(0, 4);
