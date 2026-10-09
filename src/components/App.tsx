import { useEffect, useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import NavBar from './NavBar';
import FeaturedMovie from './FeaturedMovie';
import MoviesList from './MoviesList';
import FavoritesList from './FavoritesList';
import HiddenList from './HiddenList';
import Footer from './Footer';
import tmdb from '../api/tmdb';
import { pickTrailer } from '../api/helpers';
import './css/App.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #07080a;
    --text: var(--white);
    --surface-2: #1d2027;
    --muted: #9aa0ab;
    --radius: 14px;
    --nav-h: 64px;
    --gutter: clamp(16px, 4vw, 56px);
    --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-padding-top: calc(var(--nav-h) + 12px);
  }

  /* the navbar is fixed and the hero already clears it, so no body padding */
  html body {
    padding-top: 0;
    background: var(--bg);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  html body,
  html body * {
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }

  button {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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

// Reads a saved list from local storage; an empty list if there is none
const loadSaved = (type: string): Movie[] => {
  try {
    return JSON.parse(localStorage.getItem(`movie-database-${type}`) ?? '[]');
  } catch {
    return [];
  }
};

const App = function () {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>(() =>
    loadSaved('favorites'),
  );
  const [hidden, setHidden] = useState<Movie[]>(() => loadSaved('hidden'));
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [featuredMovieTrailer, setFeaturedMovieTrailer] = useState<
    Trailer | undefined
  >(undefined);
  const [genre, setGenre] = useState('');
  const [query, setQuery] = useState('');
  const [favoritesOpened, setFavoritesOpened] = useState(false);
  const latestRequest = useRef(0);

  // Returns false if a newer request started meanwhile, so its results aren't overwritten
  const getMovies = async (
    action: string,
    query = '',
    with_genres: number | string = '',
    updateFeatured = action !== 'search',
  ) => {
    const request = ++latestRequest.current;
    const params = {
      api_key: API_KEY,
      include_adult: false,
      include_video: false,
      query,
      'vote_count.gte': 100,
      with_genres,
    };
    // 'trending' is its own endpoint; the others follow /3/<action>/movie
    const url =
      action === 'trending' ? '/3/trending/movie/week' : `/3/${action}/movie`;
    const [movies, movies2] = await Promise.all(
      [1, 2].map((page) => tmdb.get(url, { params: { ...params, page } })),
    );
    if (request !== latestRequest.current) return false;

    // The two pages are fetched a moment apart, so a movie can show up on both
    // when popularity shifts in between. Keep only the first of each.
    const fetchedMovies: Movie[] = [
      ...movies.data.results,
      ...movies2.data.results,
    ].filter(
      (movie: Movie, index: number, all: Movie[]) =>
        all.findIndex((other) => other.id === movie.id) === index,
    );

    // TMDB's relevance order buries the well-known matches and also matches inside original
    // titles ("dune" hits "d'une"), so put titles containing the query as a word first, by popularity
    if (action === 'search') {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const titleMatch = new RegExp(`\\b${escaped}\\b`, 'i');
      const rank = (movie: Movie) => (titleMatch.test(movie.title) ? 0 : 1);
      fetchedMovies.sort(
        (a, b) =>
          rank(a) - rank(b) || (b.popularity ?? 0) - (a.popularity ?? 0),
      );
    }

    // Searching keeps the current featured movie; browsing features the top result
    if (updateFeatured && movies.data.results.length) {
      const topMovie: Movie = movies.data.results[0];
      const topTrailer = await getTrailer(topMovie.id);
      if (request !== latestRequest.current) return false;
      setFeaturedMovie(topMovie);
      setFeaturedMovieTrailer(topTrailer);
    }

    setDataLoaded(true);
    setMovies(fetchedMovies);
    return true;
  };

  const getTrailer = async (movieId: number) => {
    const videos = await tmdb.get(`/3/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return pickTrailer(videos.data.results);
  };

  // When App component mounts, get this week's trending movies from tmdb
  useEffect(() => {
    getMovies('trending');
  }, []);

  const saveToLocalStorage = (type: string, movies: Movie[]) => {
    localStorage.setItem(`movie-database-${type}`, JSON.stringify(movies));
  };

  // When a genre is selected, get the most popular movies in that genre (trending has no genre filter)
  const onSelectGenre = (name: string, id: number): void => {
    // Clicking the genre that is already showing would just refetch it
    if (name === genre) return;
    getMovies('discover', '', id);
    setGenre(name);
    setQuery('');
  };

  // When the All chip is clicked, go back to trending movies across all genres, staying where you are
  const onClearGenre = (): void => {
    getMovies('trending');
    setGenre('');
    setQuery('');
  };

  // When the logo is clicked, do the same and scroll back to the top
  const onGoHome = (): void => {
    onClearGenre();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When SearchBar component is submitted, get movie data from tmdb using "search" action and scroll to the results
  const onSearchSubmit = async (input: string) => {
    const query = input.trim();
    if (!query) {
      onSearchClear();
      return;
    }
    if (!(await getMovies('search', query))) return;
    setGenre('');
    setQuery(query);
    document
      .getElementById('movies-list')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  // When the add favorite button is clicked, checks for duplicates then add to the favorite list and to local storage
  const onAddFavorite = (movie: Movie): void => {
    if (!favorites.some((favorite: Movie) => favorite.id === movie.id)) {
      const newFavoritesList = [...favorites, movie];
      setFavorites(newFavoritesList);
      saveToLocalStorage('favorites', newFavoritesList);
    }
  };

  // When the remove favorite button is clicked, checks the favorites list for the movie then remove from the favorite list and from local storage
  const onRemoveFavorite = (movie: Movie): void => {
    const newFavoritesList = favorites.filter((favorite: Movie) => {
      return favorite.id !== movie.id;
    });
    setFavorites(newFavoritesList);
    saveToLocalStorage('favorites', newFavoritesList);
  };

  // When the search is emptied, go back to trending movies but keep the featured movie
  const onSearchClear = async () => {
    if (!query) return;
    if (!(await getMovies('trending', '', '', false))) return;
    setGenre('');
    setQuery('');
  };

  // When Favorites is clicked, scroll up to the favorites list (shown even if empty)
  const onShowFavorites = (): void => {
    setFavoritesOpened(true);
    document
      .getElementById('favorites-list')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  // When a Movie is clicked update the featured movie with the movie data and trailer
  const onClickMovieItem = async (movie: Movie): Promise<void> => {
    const clickedMovieTrailer = await getTrailer(movie.id);
    setFeaturedMovie(movie);
    setFeaturedMovieTrailer(clickedMovieTrailer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onHideMovie = (movie: Movie): void => {
    if (!hidden.some((hidden) => hidden.id === movie.id)) {
      const hiddenList = [...hidden, movie];
      setHidden(hiddenList);
      saveToLocalStorage('hidden', hiddenList);
    }
  };

  // Takes one movie off the hidden list; it goes back to its place in the movie list
  const onUnhideMovie = (movie: Movie): void => {
    const hiddenList = hidden.filter((hidden) => hidden.id !== movie.id);
    setHidden(hiddenList);
    saveToLocalStorage('hidden', hiddenList);
  };

  const clearHiddenList = (): void => {
    setHidden([]);
    localStorage.removeItem('movie-database-hidden');
  };

  if (!dataLoaded) return <div></div>;

  // Hidden movies stay in `movies` and are left out here, so they can come back
  const visibleMovies = movies.filter(
    (movie) => !hidden.some((hiddenMovie) => hiddenMovie.id === movie.id),
  );

  return (
    <div>
      <GlobalStyle />
      <NavBar
        favoritesCount={favorites.length}
        query={query}
        onGoHome={onGoHome}
        onSearchSubmit={onSearchSubmit}
        onSearchClear={onSearchClear}
        onShowFavorites={onShowFavorites}
      />
      {featuredMovie && (
        <FeaturedMovie
          key={featuredMovie.id}
          featuredMovie={featuredMovie}
          featuredMovieTrailer={featuredMovieTrailer}
          isFavorite={favorites.some(
            (favorite: Movie) => favorite.id === featuredMovie.id,
          )}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      )}
      <main>
        <FavoritesList
          favorites={favorites}
          showEmpty={favoritesOpened}
          onRemoveFavorite={onRemoveFavorite}
          onClickMovieItem={onClickMovieItem}
        />
        <MoviesList
          genre={genre}
          query={query}
          movies={visibleMovies}
          onSelectGenre={onSelectGenre}
          onClearGenre={onClearGenre}
          onAddFavorite={onAddFavorite}
          onClickMovieItem={onClickMovieItem}
          onHideMovie={onHideMovie}
        />
        <HiddenList
          hiddenList={hidden}
          onClickMovieItem={onClickMovieItem}
          onUnhideMovie={onUnhideMovie}
          clearHiddenList={clearHiddenList}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
