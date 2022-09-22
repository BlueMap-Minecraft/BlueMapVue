import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/settings.json': {
        //target: 'http://localhost:8100',
        target: 'https://bluecolored.de/bluemap',
        changeOrigin: true,
      },
      '/maps': {
        //target: 'http://localhost:8100',
        target: 'https://bluecolored.de/bluemap',
        changeOrigin: true,
      },
      '/assets/playerheads': {
        //target: 'http://localhost:8100',
        target: 'https://bluecolored.de/bluemap',
        changeOrigin: true,
      }
    }
  },
  plugins: [vue()]
});
