/* eslint no-console: ["off", { allow: ["warn"] }] */

const path = require('path');
const chalk = require('chalk');
const Cattleman = require('cattleman');
const shell = require('shelljs');

const srcPath = 'src';
const distPath = process.env.NODE_ENV === 'production' ? 'dist' : 'app';

async function build(module) {
  const srcPathDirs = srcPath.split('/');

  const file = path.parse(module);
  const moduleDirs = file.dir.split(path.sep);
  const targetDirs = moduleDirs.splice(srcPathDirs.length, moduleDirs.length);
  const targetPath = path.normalize(targetDirs.join(path.sep));
  const targetDir = path.join(distPath, targetPath);

  await shell.mkdir('-p', targetDir);
  await shell.cp(module, targetDir);
}

async function rebuild(module) {
  console.log('STATIC: move', chalk.green(module));
  build(module);
}

(async () => {
  const cattleman = new Cattleman({
    directory: srcPath,
    excludes: ['styleguide'],
  });
  const modules = cattleman.gatherFiles([
    '.woff',
    '.woff2',
    '.ttf',
    '.json',
  ]);

  await Promise.all(modules.map(async (module) => {
    await build(module);
  }));
})();

exports.rebuild = rebuild;
