import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Item = styled.li`
  padding: 12px;
  display: block;
  background: #144b5c;
  color: #fdfdfe;
  width: 200px;
`;

const List = styled.div`
  position: absolute;
  display: none;
  background: #144b5c;
  border: 1px solid #fdfdfe;

  ${Item}:hover {
    background: #22848d;
    cursor: pointer;
  }

  /* phones: a full-width panel under the navbar */
  @media (max-width: 600px) {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    max-height: calc(100vh - 64px);
    overflow-y: auto;

    & > div {
      flex: 1;
    }

    ${Item} {
      width: auto;
    }
  }
`;

// Opens on tap/click; hover also opens it on devices with a mouse
const Menu = styled.div`
  position: relative;

  ${(props) => (props.$open ? `${List} { display: flex; }` : '')}

  @media (hover: hover) {
    &:hover ${List} {
      display: flex;
    }
  }

  .item:hover {
    color: #fdfdfe;
    background: #22848d;
  }
`;

const Dropdown = ({ onSelectGenre }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  // Close when tapping anywhere outside the menu
  React.useEffect(() => {
    if (!open) return;
    const onClickOutside = (event) => {
      if (!menuRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [open]);

  const selectGenre = (genre, id) => {
    setOpen(false);
    onSelectGenre(genre, id);
  };

  const genreList = {
    ACTION: 28,
    ADVENTURE: 12,
    ANIMATION: 16,
    COMEDY: 35,
    CRIME: 80,
    DOCUMENTARY: 99,
    DRAMA: 18,
    FAMILY: 10751,
    FANTASY: 14,
    HISTORY: 36,
    HORROR: 27,
    MUSIC: 10402,
    MYSTERY: 9648,
    ROMANCE: 10749,
    'SCIENCE FICTION': 878,
    'TV MOVIE': 10770,
    THRILLER: 53,
    WAR: 10752,
    WESTERN: 37
  };
  const genreListSize = Object.keys(genreList).length;
  return (
    <Menu ref={menuRef} $open={open} onMouseLeave={() => setOpen(false)}>
      <button className="item" aria-expanded={open} onClick={() => setOpen(!open)}>
        GENRES
        <i className="caret down icon"></i>
      </button>
      <List>
        <div>
          {Object.entries(genreList).map(([genre, id], index) => {
            while (index < genreListSize / 2) {
              return (
                <Item key={id} onClick={() => selectGenre(genre, id)}>
                  {genre}
                </Item>
              );
            }
            return null;
          })}
        </div>
        <div>
          {Object.entries(genreList).map(([genre, id], index) => {
            while (index > genreListSize / 2) {
              return (
                <Item key={id} onClick={() => selectGenre(genre, id)}>
                  {genre}
                </Item>
              );
            }
            return null;
          })}
        </div>
      </List>
    </Menu>
  );
};

Dropdown.propTypes = {
  onSelectGenre: PropTypes.func.isRequired
};

export default Dropdown;
