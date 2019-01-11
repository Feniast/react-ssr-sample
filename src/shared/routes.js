import Loadable from 'react-loadable';
import Loading from './components/Loading';
import Home from './views/Home';

const About = Loadable({
  loader: () => import('./views/About'),
  loading: Loading
});

const Count = Loadable({
  loader: () => import('./views/Count'),
  loading: Loading
});

const routes = [
  {
    component: Home,
    exact: true,
    path: "/"
  },
  {
    component: About,
    exact: true,
    path: '/about'
  },
  {
    component: Count,
    exact: true,
    path: '/count'
  }
];

export default routes;
