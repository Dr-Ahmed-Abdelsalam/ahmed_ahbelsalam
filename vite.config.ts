import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  base: isGitHubPages ? '/ahmed_ahbelsalam/' : '/',
  plugins: isGitHubPages ? [react()] : [react(), cloudflare()],
  build: {
    target: 'es2022',
  },
});
