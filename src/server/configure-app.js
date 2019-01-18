const express = require('express');

const PUBLIC_URL = process.env.PUBLIC_URL || '/';

const ASSETS_PATH = process.env.ASSETS_PATH || require('../../config/paths').clientBuild;

module.exports = (app) => {
  app.use(PUBLIC_URL, express.static(ASSETS_PATH));
}
