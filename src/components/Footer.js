import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
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
          <img className="tmdb_logo" src="tmdb_logo.svg" alt="the movie database logo" />
        </a>
      </div>
      <p>Designed and created by Michael Suchorolski &copy; 2019</p>
    </div>
  );
};

export default Footer;
