// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  ShopListPage,
} from './';

export default {
  path: 'demo',
  name: 'Demo',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'shop', name: 'Shop list page', role:"admin", component: ShopListPage },
  ],
};
