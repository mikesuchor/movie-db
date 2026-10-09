import React from 'react';
import styled from 'styled-components';
import { Star, Eye } from 'lucide-react';
import { posterUrl, formatRating, releaseYear } from '../api/helpers';

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: rgba(10, 11, 14, 0.78);
  color: var(--text);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.15s var(--ease);

  &:hover {
    background: var(--gold);
    color: #000;
  }
`;

const Card = styled.article`
  position: relative;
`;

const Info = styled.span`
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  padding: 48px 12px 12px;
  background: linear-gradient(to top, rgba(7, 8, 10, 0.95), rgba(7, 8, 10, 0));
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.25s var(--ease),
    transform 0.25s var(--ease);

  /* touch screens have no hover, so keep the titles visible */
  @media (hover: none) {
    opacity: 1;
    transform: none;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.2s var(--ease),
    transform 0.2s var(--ease);

  ${Card}:hover &,
  ${Card}:focus-within & {
    opacity: 1;
    transform: none;
  }

  @media (hover: none) {
    opacity: 1;
    transform: none;
  }
`;

const PosterButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
  text-align: left;
  aspect-ratio: 2 / 3;
  transition:
    transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${Card}:hover &,
  ${Card}:focus-within & {
    transform: translateY(-6px);
    box-shadow:
      0 16px 32px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(242, 163, 15, 0.5);

    @media (prefers-reduced-motion: reduce) {
      transform: none;
    }
  }

  ${Card}:hover ${Info},
  ${Card}:focus-within ${Info} {
    opacity: 1;
    transform: none;
  }
`;

const Rating = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(7, 8, 10, 0.75);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: var(--gold);
  font-size: 12px;
  font-weight: 700;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
`;

const Year = styled.span`
  margin-top: 2px;
  color: var(--muted);
  font-size: 12px;
`;

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

interface HiddenItemProps {
  movie: Movie;
  onClickMovieItem: (movie: Movie) => void;
  onUnhideMovie: (movie: Movie) => void;
}

const HiddenItem = ({
  movie,
  onClickMovieItem,
  onUnhideMovie,
}: HiddenItemProps) => {
  const year = releaseYear(movie);

  return (
    <Card>
      <PosterButton
        type="button"
        onClick={() => onClickMovieItem(movie)}
        aria-label={`Show ${movie.title}`}
      >
        <img
          src={posterUrl(movie.poster_path)}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = `${import.meta.env.BASE_URL}poster-placeholder.svg`;
          }}
        />
        {movie.vote_average > 0 && (
          <Rating>
            <Star size={12} fill="currentColor" />
            {formatRating(movie.vote_average)}
          </Rating>
        )}
        <Info>
          <Title>{movie.title}</Title>
          {year && <Year>{year}</Year>}
        </Info>
      </PosterButton>
      <Actions>
        <IconButton
          type="button"
          aria-label={`Unhide: ${movie.title}`}
          title="Unhide"
          onClick={() => onUnhideMovie(movie)}
        >
          <Eye size={18} />
        </IconButton>
      </Actions>
    </Card>
  );
};

export default HiddenItem;
