import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import "./css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a href="http://www.github.com/mikesuchor">
          <FontAwesomeIcon icon={faGithubSquare} size="2x" />
        </a>
        <a href="http://www.linkedin.com/in/michael-suchorolski">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="mailto:mikesuchor@gmail.com">
          <FontAwesomeIcon icon={faEnvelopeSquare} size="2x" />
        </a>
        <a href="https://www.themoviedb.org/">
          <img
            className="tmdb_logo"
            src="tmdb_logo.png"
            alt="the movie database logo"
          />
        </a>
      </div>
      <p>Designed and created by Michael Suchorolski &copy; 2019</p>
    </div>
  );
};

export default Footer;
