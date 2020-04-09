/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';

let isLogin;
let userRole;

function renderRouteConfigV3(routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {

    if (item.role == "admin" && userRole != "admin"){
       item = {
         ...item,
         component: () => <Redirect to="/error/403" />,
         children: [],
       }
    }

    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
        />
      );
    } else if (item.component) {
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };

  componentDidMount(){
    this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }
  
  render() {
    userRole =  this.props.store.getState().login.userRole;
    const children = renderRouteConfigV3(this.props.routeConfig, '/');
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }
}
