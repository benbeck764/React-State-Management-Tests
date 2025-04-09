import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: {
        main: resolve(__dirname, 'src/index.ts')
      },
      name: 'SpotifyReactComponents',
      fileName: 'components'
    },
    rollupOptions: {
      external: [
        ...Array.from(
          new Set([...Object.keys(pkg.devDependencies), ...Object.keys(pkg.peerDependencies)])
        )
      ],
      onwarn: (warning, warn) => {
        // Reduce noise by silencing unecessary "use client" warnings
        if (warning.message.includes(`"use client"`)) return;
        warn(warning);
      }
    }
  },
  plugins: [dts({ tsconfigPath: 'tsconfig.package.json' })]
});
