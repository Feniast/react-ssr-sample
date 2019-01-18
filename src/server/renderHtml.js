const serialize = require('serialize-javascript');

let publicUrl = process.env.PUBLIC_URL || '/';

if (publicUrl.endsWith('/')) publicUrl = publicUrl.slice(0, publicUrl.length - 1);

const renderHTML = ({ state, helmet, markup, bundles }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  const stylesheets = bundles.css || [];
  const scripts = bundles.js || [];
  
  // load runtime first to prevent some bugs on hot update in dev
  // FIXME: this code may not work if the runtime bundle name change or multiple filename with runtime prefix
  if (process.env.NODE_ENV === 'development') {
    const runtimeIdx = scripts.findIndex((script) => script.file.startsWith('runtime'));
    if (runtimeIdx >= 0) {
      const runtime = scripts.splice(runtimeIdx, 1);
      scripts.unshift(...runtime);
    }
  }

  const preloads =  scripts.map(script => {
    return `<link rel="preload" as="script" href="${script.publicPath}"></script>`
  }).join('\n');

  const stylesheetsStr = stylesheets.map(stylesheet => {
    return `<link href="${stylesheet.publicPath}" rel="stylesheet" />`;
  }).join('\n');

  const scriptsStr = scripts.map(script => {
    return `<script src="${script.publicPath}"></script>`
  }).join('\n');

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${preloads}
        ${stylesheetsStr}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}
      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(state)}
        </script>
        ${scriptsStr}
      </body>
    </html>
  `;
};

export default renderHTML;
