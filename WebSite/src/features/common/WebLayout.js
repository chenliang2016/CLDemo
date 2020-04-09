import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import NProgress from 'nprogress'

import {
  pathMatchRegexp
} from '../../utils'

import { BackTop, Layout } from 'antd'
import { WebSiteLayout } from '../../components'

const { Content } = Layout
const { Header } = WebSiteLayout

export class WebLayout extends Component {
  previousPath = ''
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {

    const {common,location}  = this.props;
    const {collapsed,routeList,loading} = common

    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    if (!loading) {
      NProgress.done()
      this.previousPath = currentPath
    }

    const fixed = true;
    const menus = routeList.filter(_ => _.menuParentId !== '-1').filter(_ => _.show !== false)
    const currentRoute = routeList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    const notifications = [];

    const headerProps = {
      menus,
      fixed,
      collapsed,
      notifications,
      onCollapseChange:this.onCollapseChange,
      avatar: "",
      username: "test",
      theme:"light",
      location,
      
      onSignOut() {
      },
    }

    return (
      <div className="website-layout">
        <Fragment>
        <div 
          className="container" 
          style={{ paddingTop: 0 }}
          id="primaryLayout">
          <img className="headerImg" src="https://ybimage.yishouyun.net/top.jpeg" />
          <Header {...headerProps} />
          <Content className="content">
            {this.props.children}
          </Content>
          <BackTop
              className="backTop"
              target={() => document.querySelector('#primaryLayout')}
            />
        </div>
      </Fragment>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebLayout);
