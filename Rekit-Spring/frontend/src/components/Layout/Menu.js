import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import {
  arrayToTree,
  queryAncestors,
  pathMatchRegexp,
} from '../../utils'
import store from 'store'
import './Menu.less'

import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [],
  }

  onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }

    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  }

  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name} </span>
              </span>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
            <Link to={item.route}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
        </Menu.Item>
      )
    })
  }

  render() {
    const {
      collapsed,
      theme,
      menus,
      location,
    } = this.props

    // Generating tree-structured data for menu content.
    const menuTree = arrayToTree(menus, 'id', 'menuParentId')

    // Find a menu that matches the pathname.
    const currentMenu = menus.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // Find the key that should be selected according to the current menu.
    const selectedKeys = currentMenu
      ? queryAncestors(menus, currentMenu, 'menuParentId').map(_ => _.id)
      : []

    const menuProps = collapsed
      ? {}
      : {
          openKeys: this.state.openKeys,
        }

    return (
      <Menu
        mode="inline"
        theme={theme}
        collapsed={collapsed}
        onOpenChange={this.onOpenChange}
        selectedKeys={selectedKeys}
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
}

export default SiderMenu
