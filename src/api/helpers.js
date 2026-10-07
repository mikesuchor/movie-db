// Poster image URL, or a placeholder for movies TMDB has no poster for
export const posterUrl = (posterPath) =>
  posterPath
    ? `https://image.tmdb.org/t/p/w185${posterPath}`
    : `${import.meta.env.BASE_URL}poster-placeholder.svg`;

// TMDB lists videos in no useful order, so prefer official YouTube trailers,
// then trailers, then teasers, then anything else on YouTube
export const pickTrailer = (videos = []) => {
  const rank = (video) =>
    (video.type === 'Trailer' ? 0 : video.type === 'Teaser' ? 2 : 4) + (video.official ? 0 : 1);

  return videos
    .filter((video) => video.site === 'YouTube')
    .sort((a, b) => rank(a) - rank(b))[0];
};

// TMDB ratings come with up to three decimals (8.198); show one (8.2)
export const formatRating = (rating) => Number(rating || 0).toFixed(1);
