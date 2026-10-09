import React from 'react';
import styled from 'styled-components';
import { Bookmark } from 'lucide-react';
import SearchBar from './SearchBar';

const Nav = styled.nav<{ $solid: boolean }>`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 20;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 var(--gutter);
  background: ${(props) => (props.$solid ? 'rgba(7, 8, 10, 0.72)' : 'linear-gradient(to bottom, rgba(7, 8, 10, 0.85), rgba(7, 8, 10, 0))')};
  border-bottom: 1px solid
    ${(props) => (props.$solid ? 'var(--border)' : 'transparent')};
  -webkit-backdrop-filter: ${(props) => (props.$solid ? 'blur(16px) saturate(140%)' : 'none')};
  backdrop-filter: ${(props) => (props.$solid ? 'blur(16px) saturate(140%)' : 'none')};
  transition: border-color 0.3s var(--ease);

  @media (max-width: 640px) {
    gap: 10px;
  }
`;

const Logo = styled.button`
  padding: 6px 0;
  border: 0;
  background: none;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text);

  b {
    color: var(--gold);
    font-weight: 800;
  }
`;

const NavButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 14px;
  font-weight: 500;
  transition:
    border-color 0.2s,
    background 0.2s;

  &:hover {
    border-color: var(--gold);
    background: var(--surface-2);
  }

  @media (max-width: 640px) {
    padding: 0 12px;
  }
`;

const NavLabel = styled.span`
  @media (max-width: 640px) {
    display: none;
  }
`;

const Badge = styled.span`
  min-width: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--gold);
  color: #000;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
`;

interface NavBarProps {
  favoritesCount: number;
  query: string;
  onGoHome: () => void;
  onSearchSubmit: (input: string) => void;
  onSearchClear: () => void;
  onShowFavorites: () => void;
}

const NavBar = ({
  favoritesCount,
  query,
  onGoHome,
  onSearchSubmit,
  onSearchClear,
  onShowFavorites,
}: NavBarProps) => {
  const [scrolled, setScrolled] = React.useState(false);

  // The bar turns solid once the hero scrolls underneath it
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav $solid={scrolled} aria-label="Main">
      <Logo type="button" onClick={onGoHome} aria-label="Movie Database home">
        <span>
          Movie<b>DB</b>
        </span>
      </Logo>
      <SearchBar
        query={query}
        onSearchSubmit={onSearchSubmit}
        onSearchClear={onSearchClear}
      />
      <NavButton type="button" onClick={onShowFavorites} aria-label="Favorites">
        <Bookmark size={18} />
        <NavLabel>Favorites</NavLabel>
        {favoritesCount > 0 && <Badge>{favoritesCount}</Badge>}
      </NavButton>
    </Nav>
  );
};

export default NavBar;
