const publicUrl = process.env.PUBLIC_URL || '/';

const imgExts = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'bmp'];
const fontExts = ['woff', 'woff2', 'ttf', 'otf', 'eot'];

require('@babel/register')({
  cache: false,
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    // keep same as webpack config
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: require('generic-names')('[name]__[local]--[hash:base64:5]', {
          context: process.cwd()
        }),
        preprocessCss: require('./sass-loader.js')
      }
    ],
    'dynamic-import-node',
    // keep same as webpack config
    [
      'file-loader',
      {
        name: '[hash].[ext]',
        extensions: [...imgExts, ...fontExts],
        publicPath: publicUrl,
        outputPath: null,
        context: '',
        limit: 8192
      }
    ]
  ]
});
