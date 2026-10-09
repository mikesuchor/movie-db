# Movie Database

Browse trending movies, watch trailers, and hide the ones you've already seen. Built with React and TypeScript on the [TMDB API](https://www.themoviedb.org/), using LocalStorage for favorites and hidden movies.

Live site: https://movie-database.netlify.app/

## Setup

Requires Node 20.19+ (see `.nvmrc`).

1. `npm install` installs dependencies.
2. Get a free API key from your [TMDB account settings](https://www.themoviedb.org/settings/api).
3. Copy `.env.example` to `.env.local` and put the key in it:

   ```
   VITE_TMDB_API_KEY=your_key_here
   ```

   Without a key the site loads but shows no movies. `.env.local` is git-ignored.

## Scripts

- `npm run dev` (or `npm start`) runs the app at http://localhost:5173 with hot reloading.
- `npm run build` type-checks the code with `tsc`, then builds the production site into `build/`.
- `npm run preview` serves that build locally.

## Deploying

Built with [Vite](https://vite.dev/). Netlify deploys use `netlify.toml`. Add `VITE_TMDB_API_KEY` under **Site settings > Environment variables** in Netlify, because `.env.local` is not deployed.

Vite inlines the key into the built JavaScript, so it is visible in the browser. That is normal for TMDB's read-only API keys.

## Credits

Movie data and images are from [TMDB](https://www.themoviedb.org/). This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
