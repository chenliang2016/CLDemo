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
import { MyLayout } from '../../components'

const { Content } = Layout
const { Sider,Header,Bread } = MyLayout

export class CommonLayout extends Component {
  previousPath = ''
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onCollapseChange = () => {
     const {actions} = this.props;
     const {collapseChange} = actions;
     collapseChange();
  }

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
      
      onSignOut() {
      },
    }

    const siderProps = {
      theme:"light",
      menus,
      collapsed,
      location,
    }

    return (
      <div className="common-layout">
        <Fragment>
        <Layout>
        <Sider {...siderProps} />
        <div 
          className="container" 
          style={{ paddingTop: fixed ? 72 : 0 }}
          id="primaryLayout">
          <Header {...headerProps} />
          <Content className="content">
             <Bread routeList={routeList} location={location} />
            {this.props.children}
          </Content>
          <BackTop
              className="backTop"
              target={() => document.querySelector('#primaryLayout')}
            />
        </div>
       </Layout>
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
)(CommonLayout);
