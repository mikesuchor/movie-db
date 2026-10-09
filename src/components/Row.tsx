import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Section = styled.section`
  padding: 40px var(--gutter) 8px;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(22px, 2.6vw, 30px);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Muted = styled.p`
  color: var(--muted);
  font-size: 14px;
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Arrow = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: var(--surface-2);
  color: var(--text);
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: var(--gold);
    color: #000;
  }

  @media (hover: none) {
    display: none;
  }
`;

const Scroller = styled.div`
  display: flex;
  gap: 16px;
  margin: 0 calc(var(--gutter) * -1);
  padding: 4px var(--gutter) 16px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-padding: 0 var(--gutter);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    flex: none;
    width: clamp(140px, 15vw, 190px);
    scroll-snap-align: start;
  }
`;

// A titled, horizontally scrolling strip of cards with arrow buttons on wide screens
interface RowProps {
  id?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const Row = ({ id, title, subtitle, action, children }: RowProps) => {
  const scroller = React.useRef<HTMLDivElement>(null);
  const scrollBy = (direction: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <Section id={id}>
      <SectionHead>
        <div>
          <SectionTitle>{title}</SectionTitle>
          {subtitle && <Muted>{subtitle}</Muted>}
        </div>
        <Tools>
          {action}
          <Arrow
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
          >
            <ChevronLeft size={20} />
          </Arrow>
          <Arrow
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
          >
            <ChevronRight size={20} />
          </Arrow>
        </Tools>
      </SectionHead>
      <Scroller ref={scroller}>{children}</Scroller>
    </Section>
  );
};

export default Row;
