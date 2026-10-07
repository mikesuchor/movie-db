import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    // same output folder as create-react-app, so Netlify's publish directory still works
    outDir: 'build'
  }
});
