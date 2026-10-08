import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const fade = keyframes`
  from {
    opacity: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.82);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  animation: ${fade} 0.25s var(--ease);
`;

const Body = styled.div`
  position: relative;
  width: min(960px, 100%);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  background: #000;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: var(--radius);
`;

const Close = styled.button`
  position: absolute;
  top: -48px;
  right: 0;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: var(--surface-2);
  color: var(--text);
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: var(--gold);
    color: #000;
  }
`;

const TrailerModal = ({ trailer, onClose }) => {
  React.useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <Overlay role="dialog" aria-modal="true" aria-label={trailer.name} onClick={onClose}>
      <Body onClick={(event) => event.stopPropagation()}>
        <Close type="button" aria-label="Close trailer" onClick={onClose} autoFocus>
          <X size={22} />
        </Close>
        <Video
          title={trailer.name}
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </Body>
    </Overlay>
  );
};

TrailerModal.propTypes = {
  trailer: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TrailerModal;
