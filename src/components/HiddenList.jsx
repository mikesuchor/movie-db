import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ChevronDown, RotateCcw } from 'lucide-react';
import HiddenItem from './HiddenItem';
import Row from './Row';

const Section = styled.section`
  padding: 40px var(--gutter) 8px;
`;

const SmallButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  font-size: 13px;
  font-weight: 600;
  transition: transform 0.15s var(--ease), background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Disclosure = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  font-size: 14px;
  font-weight: 500;

  &:hover {
    border-color: var(--gold);
  }
`;

const HiddenList = ({
  hiddenList,
  onClickMovieItem,
  onUnhideMovie,
  clearHiddenList
}) => {
  const [open, setOpen] = React.useState(false);

  if (!hiddenList.length) return null;

  if (!open) {
    return (
      <Section>
        <Disclosure type="button" aria-expanded="false" onClick={() => setOpen(true)}>
          Hidden movies ({hiddenList.length}) <ChevronDown size={18} />
        </Disclosure>
      </Section>
    );
  }

  const action = (
    <>
      <SmallButton type="button" onClick={clearHiddenList}>
        <RotateCcw size={14} /> Unhide all
      </SmallButton>
      <SmallButton type="button" onClick={() => setOpen(false)}>
        Collapse
      </SmallButton>
    </>
  );

  return (
    <Row title="Hidden" subtitle={`${hiddenList.length} hidden`} action={action}>
      {hiddenList.map((movie) => (
        <HiddenItem
          key={movie.id}
          movie={movie}
          onClickMovieItem={onClickMovieItem}
          onUnhideMovie={onUnhideMovie}
        />
      ))}
    </Row>
  );
};

HiddenList.propTypes = {
  hiddenList: PropTypes.array.isRequired,
  onClickMovieItem: PropTypes.func.isRequired,
  onUnhideMovie: PropTypes.func.isRequired,
  clearHiddenList: PropTypes.func.isRequired
};

export default HiddenList;
