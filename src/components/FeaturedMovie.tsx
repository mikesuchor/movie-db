import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Play, Plus, Check, Star } from 'lucide-react';
import { backdropUrl, formatRating, releaseYear } from '../api/helpers';
import TrailerModal from './TrailerModal';

const fade = keyframes`
  from {
    opacity: 0;
  }
`;

const Button = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  transition:
    transform 0.15s var(--ease),
    background 0.2s,
    border-color 0.2s;

  &:active {
    transform: scale(0.97);
  }

  ${(props) =>
    props.$primary
      ? css`
          background: var(--gold);
          color: #000;

          &:hover {
            background: var(--gold-light);
          }
        `
      : css`
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.18);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);

          &:hover {
            background: rgba(255, 255, 255, 0.18);
          }
        `}

  @media (max-width: 640px) {
    height: 44px;
  }
`;

const Hero = styled.header`
  position: relative;
  min-height: min(78vh, 720px);
  display: flex;
  align-items: flex-end;
  padding: calc(var(--nav-h) + 48px) var(--gutter) 56px;
  overflow: hidden;
  animation: ${fade} 0.6s var(--ease);

  @media (max-width: 640px) {
    min-height: 70vh;
    padding-bottom: 32px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background-size: cover;
  background-position: center 20%;
  background-color: var(--surface);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to right,
        rgba(7, 8, 10, 0.92) 0%,
        rgba(7, 8, 10, 0.55) 45%,
        rgba(7, 8, 10, 0.1) 100%
      ),
      linear-gradient(to top, var(--bg) 0%, rgba(7, 8, 10, 0) 45%);
  }

  @media (max-width: 640px) {
    &::after {
      background: linear-gradient(
        to top,
        var(--bg) 8%,
        rgba(7, 8, 10, 0.55) 60%,
        rgba(7, 8, 10, 0.35) 100%
      );
    }
  }
`;

const Content = styled.div`
  max-width: 600px;
`;

const Eyebrow = styled.p`
  margin-bottom: 8px;
  color: var(--gold);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(32px, 5.5vw, 64px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
`;

const Meta = styled.p`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  color: var(--muted);
  font-weight: 500;
`;

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--gold);
  font-weight: 700;
`;

const Overview = styled.p`
  margin-top: 16px;
  color: #d6d8dd;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

// App remounts it (via key) per movie so the fade-in replays on every change
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

interface FeaturedMovieProps {
  featuredMovie: Movie;
  featuredMovieTrailer?: Trailer;
  isFavorite: boolean;
  onAddFavorite: (movie: Movie) => void;
  onRemoveFavorite: (movie: Movie) => void;
}

const FeaturedMovie = ({
  featuredMovie,
  featuredMovieTrailer,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}: FeaturedMovieProps) => {
  const [trailerOpen, setTrailerOpen] = React.useState(false);
  const closeTrailer = React.useCallback(() => setTrailerOpen(false), []);
  const year = releaseYear(featuredMovie);

  return (
    <Hero>
      <Backdrop
        style={{
          backgroundImage: `url(${backdropUrl(featuredMovie.backdrop_path)})`,
        }}
      />
      <Content>
        <Eyebrow>Featured</Eyebrow>
        <Title>{featuredMovie.title}</Title>
        <Meta>
          {featuredMovie.vote_average > 0 && (
            <Rating>
              <Star size={16} fill="currentColor" />
              {formatRating(featuredMovie.vote_average)}
            </Rating>
          )}
          {year && <span>{year}</span>}
        </Meta>
        <Overview>{featuredMovie.overview}</Overview>
        <Buttons>
          {featuredMovieTrailer && (
            <Button type="button" $primary onClick={() => setTrailerOpen(true)}>
              <Play size={18} fill="currentColor" /> Watch trailer
            </Button>
          )}
          <Button
            type="button"
            onClick={() =>
              isFavorite
                ? onRemoveFavorite(featuredMovie)
                : onAddFavorite(featuredMovie)
            }
          >
            {isFavorite ? <Check size={18} /> : <Plus size={18} />}{' '}
            {isFavorite ? 'In Favorites' : 'Add to Favorites'}
          </Button>
        </Buttons>
      </Content>
      {trailerOpen && featuredMovieTrailer && (
        <TrailerModal trailer={featuredMovieTrailer} onClose={closeTrailer} />
      )}
    </Hero>
  );
};

export default FeaturedMovie;
