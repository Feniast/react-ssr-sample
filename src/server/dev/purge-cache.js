/* eslint-disable no-console */
const chokidar = require('chokidar');

const paths = require('../../../config/paths');

const watcher = chokidar.watch([paths.src, paths.config, paths.build]);

watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('Reloading server...');
    Object.keys(require.cache).forEach(id => {
      if (!/node_modules/.test(id) && /[/\\](src|config|build)[/\\]/.test(id)) {
        delete require.cache[id];
      }
    });
  });
});