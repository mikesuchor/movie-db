import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
`;

const TMDBLogo = styled.img`
  height: 44px;
  margin-left: 6px;
  margin-top: 2px;
`;

const Copyright = styled.p`
  margin: 10px 0 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Icons>
        <a href="http://www.github.com/mikesuchor">
          <i className="github square icon big"></i>
        </a>
        <a href="http://www.linkedin.com/in/michael-suchorolski">
          <i className="linkedin square icon big"></i>
        </a>
        <a href="mailto:mikesuchor@gmail.com">
          <i className="envelope square icon big"></i>
        </a>
        <a href="https://www.themoviedb.org/">
          <TMDBLogo src="tmdb_logo.svg" alt="the movie database logo" />
        </a>
      </Icons>
      <Copyright>Designed and created by Michael Suchorolski &copy; 2019</Copyright>
    </Container>
  );
};

export default Footer;
