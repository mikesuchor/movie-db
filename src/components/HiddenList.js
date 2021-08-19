import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HiddenItem from './HiddenItem';

const Hidden = styled.div`
  border-top: 1px solid #fdfdfe;
  border-bottom: 1px solid #fdfdfe;
  background: #0d253f;
  padding-bottom: 15px;

  i.caret {
    font-size: 32px;
    display: block;
    margin: auto;
  }

  i.icon:hover {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

const List = styled.div`
  outline: none;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  display: block;
  margin: auto;
  font-family: 'Montserrat', sans-serif;
  color: #fdfdfe;
  font-weight: 600;
  padding: 8px;
  border: 3px solid #144b5c;
  border-radius: 16px;
  background: #144b5c;

  &:hover {
    cursor: pointer;
    border: 3px solid #fdfdfe;
  }
`;

const HiddenList = ({ hiddenList, onClickMovieItem, clearHiddenList }) => {
  const [hidden, setHidden] = React.useState(false);

  if (hiddenList && hiddenList.length) {
    const renderedList = hiddenList.map((movie) => {
      return <HiddenItem key={movie.id} movie={movie} onClickMovieItem={onClickMovieItem} />;
    });

    return (
      <Hidden>
        <Title>HIDDEN LIST</Title>
        <i className="caret down icon" onClick={() => setHidden(!hidden)}></i>
        {hidden ? (
          <>
            <List>{renderedList}</List>
            <Button onClick={() => clearHiddenList()}>CLEAR HIDDEN</Button>
          </>
        ) : null}
      </Hidden>
    );
  } else return null;
};

HiddenList.propTypes = {
  hiddenList: PropTypes.array.isRequired,
  onClickMovieItem: PropTypes.func.isRequired,
  clearHiddenList: PropTypes.func.isRequired
};

export default HiddenList;
