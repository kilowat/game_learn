import { argv } from 'node:process';
import * as esbuild from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import SvgPlugin from 'esbuild-plugin-svg';
import * as path from 'path';
import { htmlPlugin } from '@jgoz/esbuild-plugin-html';
const buildPath = 'dist';
const publicPath = '/';

const
  productionMode = argv.includes('prod'),
  watchMode = argv.includes('watch'),
  servMode = argv.includes('serv'),
  target = 'chrome100,firefox100,safari15'.split(',');

console.log(`${productionMode ? 'prod' : 'dev'} ${watchMode ? 'watch' : 'build'}`);

const build = await esbuild.context({
  entryPoints: [
    './src/styles/index.scss',
    { out: 'bundle', in: './src/index.ts' },
  ],

  bundle: true,
  publicPath: publicPath,
  target,
  metafile: true,
  drop: productionMode ? ['debugger', 'console'] : [],
  logLevel: productionMode ? 'error' : 'info',
  minify: productionMode,
  sourcemap: false,
  outdir: buildPath,
  inject: !productionMode ? ['livereload.js'] : [],
  platform: 'browser',
  entryNames: '[dir]/[name]-[hash]', // Добавляем хеш к имени bundle файла
  assetNames: 'assets/[name]-[hash]',
  write: true,
  tsconfig: 'tsconfig.json',
  external: ['./src/assets/*'],
  loader: {
    '.svg': 'text',
    '.png': 'file',
    '.jpg': 'file',
    '.gif': 'file',
    '.jpeg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.ldtk': 'file',
  },
  plugins: [
    htmlPlugin({
      template: './src/index.html',
      scriptPlacement: 'body-below'
    }),
    sassPlugin({
      watch: true,
      filter: /\.scss$/i,
      type: 'css',
      loadPaths: ['./src/styles'],
    }),
    esbuildPluginTsc({
      force: true,
    }),
    SvgPlugin({
      minify: true,
    }),

    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/assets/*'],
        to: [`${buildPath}/assets`],
      },
      watch: true,
    }),

    clean({
      patterns: [`${buildPath}/**/*`, `!${buildPath}/index.html`],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    })
  ]
});

//!watchMode ?
//clean({
//  patterns: [`${buildPath}/**/*`],
//}) : { name: 'empy', setup: () => null },

if (watchMode) {
  console.log('watching...')
  await build.watch();
} else {
  let t = Date.now()
  console.log('building...')
  await build.rebuild();
  build.dispose();
  console.log('finished in', Date.now() - t, 'ms')
}

if (servMode) {
  const serv = await build.serve({
    servedir: buildPath,
    host: 'localhost',
  });
  if (productionMode) {
    console.log(`http://${serv.host}:${serv.port}`);
  }
}