module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    autoprefixer: env === 'production' ? {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
      flexbox: 'no-2009'
    } : false,
    cssnano: env === 'production' ? {} : false
  }
});
