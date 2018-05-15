/* eslint global-require: ["off", { allow: ["warn"] }] */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint import/no-dynamic-require: ["off", { allow: ["warn"] }] */

const path = require('path');
const glob = require('glob');
const tape = require('tape');
const log = require('./utils/logger');

const srcFolder = 'src';

(async () => {
  const testFunctions = [];

  await new Promise((testResolve) => {
    glob(`${srcFolder}/**/*.test.js`, async (error, files) => {
      if (error) {
        log.error('test', error);
      } else {
        const modules = files;
        await Promise.all(modules.map(async (module) => {
          const absolutePath = path.join(__dirname, '..', path.sep, module);
          const { test } = require(absolutePath);

          testFunctions.push(await test());
        }));

        testResolve();
      }
    });
  });

  tape('tests', (assert) => {
    testFunctions.forEach((testFunction) => {
      testFunction();
    });

    assert.end();
  });
})();
