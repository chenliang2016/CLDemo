import { App } from '../features/home';
import {
  Layout,
} from '../features/common/';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import _ from 'lodash';
import loginRoute from '../features/login/route';
import demoRoute from '../features/demo/route';
import errorRoute from '../features/error/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  commonRoute,
  demoRoute,
  errorRoute,
];

const childRoutesWithoutMenu = [loginRoute];

const routes = [
  {
    path: '/',
    childRoutes: [
      {
        path: '/login',
        childRoutes: [
          ...childRoutesWithoutMenu,
          { path: '*', name: 'Page not found', component: PageNotFound },
        ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
      },
      {
        path: '/',
        component: Layout,
        childRoutes: [
          ...childRoutes,
          { path: '*', name: 'Page not found', component: PageNotFound },
        ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
      },
    ],
  },
];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, (child => child.isIndex));
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }

  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
