import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar,Divider } from 'antd'
import moment from 'moment';

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, op) => {
    const { onDeleteItem, onEditItem } = this.props

    if (op === 1) {
      onEditItem(record)
    } else if (op === 2) {
      confirm({
        title: `确定要删除?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps, } = this.props

    const columns = [
      {
        title: "商户名",
        dataIndex: 'name',
        key: 'name',
        width: 180,
      },
      {
        title: "商户地址",
        dataIndex: 'address',
        key: 'address',
        width: 180,
      },
      {
        title: "联系人",
        dataIndex: 'contactMan',
        key: 'contactMan',
        width: 72,
      },
      {
        title: "创建时间",
        dataIndex: 'createAt',
        key: 'createAt',
        width: 72,
        render: text => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>,
      },
      {
        title: "状态",
        dataIndex: 'status',
        key: 'status',
        width: 72,
        render: text => <span>{text == 0 ? '关闭' : '开启'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        render: (text, record) => (
          <span>
            <a onClick = {(e) => this.handleMenuClick(record,1)}>修改</a>
            <Divider type="vertical" />
             <a onClick = {(e) => this.handleMenuClick(record,2)}>删除</a>
          </span>
        ),
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 项`,
        }}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List