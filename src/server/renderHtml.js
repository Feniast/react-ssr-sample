const serialize = require('serialize-javascript');
const { fileContentWatcher } = require('./utils');

let publicUrl = process.env.PUBLIC_URL;

if (publicUrl.endsWith('/')) publicUrl = publicUrl.slice(0, publicUrl.length - 1);

const isDev = process.env.NODE_ENV === 'development';

const assetManifestPath =
  process.env.ASSET_MANIFEST ||
  `${require('path').resolve(process.cwd(), './build/asset-manifest.json')}`;

const assetManifestGetter = fileContentWatcher(assetManifestPath, JSON.parse, {
  once: !isDev
});

const preloadScripts = bundles => {
  const mainJS = assetManifestGetter()['main.js'];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${publicUrl}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      jsFilePath =>
        `<link rel="preload" as="script" href="${jsFilePath}"></script>`
    )
    .join('');
};

const cssLinks = () => {
  if (isDev) return '';

  const assetManifest = assetManifestGetter();

  return Object.keys(assetManifest)
    .filter(file => file.match(/\.css$/))
    .map(cssFile => assetManifest[cssFile])
    .map(cssFilePath => `<link rel="stylesheet" href="${cssFilePath}">`)
    .join('');
};

const jsScripts = bundles => {
  const mainChunk = assetManifestGetter()['main.js'];
  const runtimeChunk = assetManifestGetter()['runtime~main.js'];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${publicUrl}/${jsBundle.file}`);

  return [runtimeChunk, ...bundleFilePaths, mainChunk]
    .map(
      jsFilePath =>
        `<script type="text/javascript" src="${jsFilePath}"></script>`
    )
    .join('');
};

const renderHTML = ({ state, helmet, markup, bundles }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  const stylesheets = bundles.css || [];
  const scripts = bundles.js || [];

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${stylesheets.map(stylesheet => {
          return `<link href="${stylesheet.publicPath}" rel="stylesheet" />`;
        }).join('\n')}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}
      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(state)}
        </script>
        ${scripts.map(script => {
          return `<script src="${script.publicPath}"></script>`
        }).join('\n')}
      </body>
    </html>
  `;
};

export default renderHTML;
