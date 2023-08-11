import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [
        dts({ insertTypesEntry: true, exclude: ['vite.config.ts', 'src/routes/*'] }),
        svelte(),
    ],
    build: {
        outDir: 'package',
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: 'src/lib/lib.ts',
            name: 'Neo: Hierarchical Confusion Matrix',
            // the proper extensions will be added
            fileName: 'confMat',
        },
        sourcemap: 'inline',
        minify: false,
    },
});
