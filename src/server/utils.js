const fs = require('fs');
const chokidar = require('chokidar');

const readFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf-8'); 
  } catch (e) {
    /* eslint-disable no-console */
    console.error(e);
    return '';
  }
}

const fileContentWatcher = (filePath, parse, { once = false } = {}) => {
  let content;

  const fileContentGetter = () => {
    let c = readFile(filePath);
    if (typeof parse === 'function') {
      return parse(c);
    }
    return c;
  }

  if (once !== true) {
    const watcher = chokidar.watch(filePath);
    watcher.on('add', () => { content = fileContentGetter(filePath) });
    watcher.on('change', () => { content = fileContentGetter(filePath) });
  }
  
  return () => content;
}

module.exports = {
  fileContentWatcher
};
