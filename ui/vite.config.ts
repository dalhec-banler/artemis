import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';

export default ({ mode }: { mode: string }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    process.env.SHIP_URL ||
    process.env.VITE_SHIP_URL ||
    'http://localhost:80';

  return defineConfig({
    plugins: [
      urbitPlugin({ base: 'artemis', target: SHIP_URL, secure: false }),
      react(),
    ],
  });
};
