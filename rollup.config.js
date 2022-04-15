import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import livereload from 'rollup-plugin-livereload';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import { Server } from 'http';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const copyright = `// ${pkg.name} v${pkg.version} Copyright ${(new Date).getFullYear()} ${pkg.author.name}`;

const production = !process.env.ROLLUP_WATCH;

export default [
    // App
    {
        input: 'src/app.ts',
        output: {
            banner: copyright,
            sourcemap: !production,
            format: 'iife',
            name: 'app',
            file: 'public/app.js',
        },
        plugins: [
            svelte({
                preprocess: autoPreprocess(),
                compilerOptions: {
                    dev: !production,
                },
            }),
            css({ output: 'bundle.css' }),
            typescript({
                noEmitOnError: false,
                sourceMap: !production,
            }),
            json(),
            resolve({
                browser: true,
                dedupe: ['svelte'],
            }),
            commonjs(),
            !production && Server(),
            !production && livereload('public'),
            production && terser({ output: { preamble: copyright } }),
        ],
        watch: {
            clearScreen: false,
        },
    },
    // Library
    {
        input: 'src/lib.ts',
        output: {
            banner: copyright,
            sourcemap: !production,
            format: 'umd',
            name: 'confMat',
            file: 'public/confMat.js',
        },
        plugins: [
            svelte({
                preprocess: autoPreprocess(),
                emitCss: false,
                compilerOptions: {
                    dev: !production,
                },
            }),
            typescript({
                noEmitOnError: false,
                sourceMap: !production,
            }),
            json(),
            resolve({
                browser: true,
                dedupe: ['svelte'],
            }),
            commonjs(),
            terser({ output: { preamble: copyright } }),
        ],
    },
];
