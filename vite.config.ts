import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

dotenv.config();

export default defineConfig(() => {
  const env = loadEnv("mock", process.cwd(), "");

  return {
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/core/components'),
        '@contexts': path.resolve(__dirname, 'src/core/contexts'),
        '@hooks': path.resolve(__dirname, 'src/core/hooks'),
        '@interfaces': path.resolve(__dirname, 'src/core/interfaces'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@reducers': path.resolve(__dirname, 'src/core/reducers'),
      },
    },
    plugins: [
      react()
    ],
  };
});
