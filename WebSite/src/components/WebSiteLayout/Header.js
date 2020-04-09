import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Avatar, Popover, Badge, List } from 'antd'
import moment from 'moment'
import classnames from 'classnames'
import { Link } from 'react-router-dom';
import {
  arrayToTree,
} from '../../utils'

import styles from './Header.less'

const { SubMenu } = Menu

export default class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
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
      fixed,
      avatar,
      theme,
      menus,
      username,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
    } = this.props

    const menuTree = arrayToTree(menus, 'id', 'menuParentId')

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                Hi,
              </span>
              <span>{username}</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
               退出
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    rightContent.unshift(
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName="notificationPopover"
        getPopupContainer={() => document.querySelector('#layoutHeader')}
        content={
          <div className="notification">
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{
                emptyText: "You have viewed all notifications.",
              }}
              renderItem={item => (
                <List.Item className="notificationItem">
                  <List.Item.Meta
                    title={item.title}
                    description={moment(item.date).fromNow()}
                  />
                  <Icon
                    style={{ fontSize: 10, color: '#ccc' }}
                    type="right"
                    theme="outlined"
                  />
                </List.Item>
              )}
            />
            {notifications.length ? (
              <div
                onClick={onAllNotificationsRead}
                className="clearButton"
              >
                Clear notifications
              </div>
            ) : null}
          </div>
        }
      >
        <Badge
          count={notifications.length}
          dot
          offset={[-10, 10]}
          className="iconButton"
        >
          <Icon className="iconFont" type="bell" />
        </Badge>
      </Popover>
    )

    return (
      <Layout.Header
        className={classnames("header", {
        })}
        id="layoutHeader"
      >
         <Menu
          mode="horizontal"
          theme={theme}
          collapsed={collapsed}
          onOpenChange={this.onOpenChange}
        >
          {this.generateMenus(menuTree)}
        </Menu>

      </Layout.Header>
    )
  }
}
