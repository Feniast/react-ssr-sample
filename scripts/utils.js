/* eslint-disable no-console */
const chalk = require('chalk');

const log = (message, level = 'info') => {
  const color =
    level === 'error' ? 'red' : level === 'warn' ? 'yellow' : 'white';
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

['error', 'info', 'warn'].forEach((level) => {
  log[level] = (message) => log(message, level);
});

const commonWebpackHandler = (err, stats) => {
  if (err) {
    log.error(err.stack || err);
    if (err.details) {
      log.error(err.details);
    }
    return false;
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    log.error(info.errors);
  }
  if (stats.hasWarnings()) {
    log.warn(info.warnings);
  }
  log(stats.toString({
    colors: true
  }));
  
  return true;
}

module.exports = {
  log,
  commonWebpackHandler
};
