import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const htmlFiles: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
  };
  for (let i = 1; i <= 32; i++) {
    const num = String(i).padStart(2, '0');
    const filename = `lesson-${num}.html`;
    const filePath = path.resolve(__dirname, filename);
    if (fs.existsSync(filePath)) {
      htmlFiles[`lesson${num}`] = filePath;
    }
  }

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: htmlFiles,
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
