import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    fastRefresh: false
  })],
  server: {
    host: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    deps: {
      inline: [/three/, /@react-three/]
    }
  }
});
