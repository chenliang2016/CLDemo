// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Page403,
} from './';

export default {
  path: 'error',
  name: 'Error',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: '403', name: 'Page 403', component: Page403 },
  ],
};
