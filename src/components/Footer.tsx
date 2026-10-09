import React from 'react';
import styled from 'styled-components';
import { Mail } from 'lucide-react';

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 56px;
  padding: 40px var(--gutter);
  border-top: 1px solid var(--border);
  text-align: center;
`;

const Links = styled.div`
  display: flex;
  gap: 8px;

  a {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: var(--muted);
    transition:
      color 0.2s,
      background 0.2s;
  }

  a:hover {
    color: var(--gold);
    background: var(--surface);
  }
`;

const TMDBLogo = styled.img`
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;

  a:hover > & {
    opacity: 1;
  }
`;

const Copyright = styled.p`
  color: var(--muted);
  font-size: 14px;
`;

// lucide dropped brand icons, so these two are inline
const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const Footer = () => (
  <Container>
    <Links>
      <a href="https://github.com/mikesuchor" aria-label="GitHub">
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/michael-suchorolski"
        aria-label="LinkedIn"
      >
        <LinkedinIcon />
      </a>
      <a href="mailto:mikesuchor@gmail.com" aria-label="Email">
        <Mail size={20} />
      </a>
    </Links>
    <a href="https://www.themoviedb.org/">
      <TMDBLogo
        src={`${import.meta.env.BASE_URL}tmdb_logo.svg`}
        alt="The Movie Database"
      />
    </a>
    <Copyright>
      Designed and created by Michael Suchorolski. This website uses TMDB and
      the TMDB APIs but is not endorsed, certified, or otherwise approved by
      TMDB.
    </Copyright>
  </Container>
);

export default Footer;
