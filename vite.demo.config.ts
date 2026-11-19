import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/akane-lib/',
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
});
