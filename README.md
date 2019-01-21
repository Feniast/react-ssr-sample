# React SSR Sample

A sample setup for React Server-Side Rendering.

## Features

Common Setup:

- Webpack 4
- Babel 7
- Eslint
- Husky & lint-staged
- Jest 23 & Enzyme
- PostCSS
- CSS Modules with sass(scss)
- HMR

App Dependencies:

- React 16
- Express
- Redux
- Redux-thunk
- Reselect
- React Router 4
- React Loadable
- React Helmet

## Initial setup

- `npm install` or `yarn`

## Development

- `yarn start`
  - Start the dev server at [http://localhost:3000](http://localhost:3000)
- `yarn test`
  - Start `jest` in watch mode

## Production

- `yarn build && yarn dist`
  - Bundle the JS and fire up the Express server for production
