import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Layout } from 'antd'
import { config } from '../../utils/config'
import ScrollBar from '../ScrollBar'
import SiderMenu from './Menu'
import './Sider.less'

class Sider extends PureComponent {
  render() {
    const {
      menus,
      theme,
      collapsed,
      location,
    } = this.props

    return (
      <Layout.Sider
        width={256}
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <div className="brand">
          <div className="logo">
            <img alt="logo" src={config.logoPath} />
            {collapsed ? null : <h1>{config.siteName}</h1>}
          </div>
        </div>

        <div className="menuContainer">
          <ScrollBar
            options={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true,
            }}
          >
            <SiderMenu
              menus={menus}
              theme={theme}
              location={location}
              collapsed={collapsed}
            />
          </ScrollBar>
        </div>
      </Layout.Sider>
    )
  }
}

Sider.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  collapsed: PropTypes.bool,
}

export default Sider
