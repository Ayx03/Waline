import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import pkg from '../package.json' assert { type: 'json' };
import vue from '@vitejs/plugin-vue';

const version = pkg.version;
const commonOptions = {
  plugins: [
    vue({
      isProduction: true,
      template: { compilerOptions: { comments: false } },
    }),
    ts(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env["NODE_ENV"]': JSON.stringify('production'),
      "process.env['NODE_ENV']": JSON.stringify('production'),
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      VERSION: JSON.stringify(version),
      preventAssignment: false,
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    terser(),
  ],
  treeshake: 'smallest',
};

const babelPlugin = getBabelOutputPlugin({
  moduleId: 'Waline',
  presets: [['@babel/preset-env', { modules: 'umd' }]],
});

export default [
  // full package
  {
    input: './src/entrys/full.ts',
    output: [
      {
        file: './dist/waline.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/waline.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/waline.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // full declaration files
  {
    input: './src/entrys/full.ts',
    output: [
      { file: './dist/waline.d.ts', format: 'esm' },
      { file: './dist/waline.d.cts', format: 'esm' },
      { file: './dist/waline.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // shim package
  {
    input: './src/entrys/full.ts',
    output: [
      {
        file: './dist/shim.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/shim.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
    external: ['@vueuse/core', 'autosize', 'marked', 'vue'],
  },

  // shim declaration files
  {
    input: './src/entrys/full.ts',
    output: [
      { file: './dist/shim.d.cts', format: 'esm' },
      { file: './dist/shim.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // components
  {
    input: './src/entrys/components.ts',
    output: [
      {
        file: './dist/component.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['@vueuse/core', 'autosize', 'marked', 'vue'],
    ...commonOptions,
  },

  // components declaration files
  // TODO: Generate declaration files

  // api
  {
    input: './src/entrys/api.ts',
    output: [
      {
        file: './dist/api.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/api.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // api declaration files
  {
    input: './src/entrys/api.ts',
    output: [
      { file: './dist/api.d.ts', format: 'esm' },
      { file: './dist/api.d.cts', format: 'esm' },
      { file: './dist/api.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // comment
  {
    input: './src/entrys/comment.ts',
    output: [
      {
        file: './dist/comment.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/comment.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/comment.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // comment declaration files
  {
    input: './src/entrys/comment.ts',
    output: [
      { file: './dist/comment.d.ts', format: 'esm' },
      { file: './dist/comment.d.cts', format: 'esm' },
      { file: './dist/comment.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // pageview
  {
    input: './src/entrys/pageview.ts',
    output: [
      {
        file: './dist/pageview.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/pageview.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/pageview.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // pageview declaration files
  {
    input: './src/entrys/pageview.ts',
    output: [
      { file: './dist/pageview.d.ts', format: 'esm' },
      { file: './dist/pageview.d.cts', format: 'esm' },
      { file: './dist/pageview.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
];
