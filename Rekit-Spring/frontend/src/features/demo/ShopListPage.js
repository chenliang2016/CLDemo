import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Page } from '../../components'
import List from './List'
import Filter from './Filter'
import ShopModal from './ShopModal'

export class ShopListPage extends Component {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { demo } = this.props
     const { page } = demo
     this.fetchList(page);
  }

  fetchList = (page,name) => {
    const {getList} = this.props.actions;
    getList(page,name);
  }

  getDataSource() {
    const { demo } = this.props;
    const { byId, list } = demo;
    if (!list) return [];
    return list.map(id => byId[id]);
  }

  get listProps() {
    const { demo,actions } = this.props
    const { getListPending,total,page } = demo
    const { deleteShop,chooseCurrentShop,shopModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getListPending,
      pagination:{
        total:total,
        current:page,
        onChange : (page) => {
          this.fetchList(page)
        }
      },
      onDeleteItem: id => {
        deleteShop(id).then((data) => {
          this.fetchList();
        })
      },
      onEditItem(item) {
         chooseCurrentShop(item);
         shopModalChange(true,"updata");
      },
    }
  }

  get filterProps() {
    const { location,actions } = this.props
    const { query } = location
    const { shopModalChange } = actions;

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
         this.fetchList(value.name)
      },
      onAdd : () =>  {
        shopModalChange(true,'create')
      },
    }
  }

  get modalProps() {
    const { demo,actions } = this.props
    const { currentShop, shopModalVisible, shopModalType,submitShopPending } = demo

    const { shopModalChange,submitShop } = actions;

    return {
      item: shopModalType === 'create' ? {} : currentShop,
      visible: shopModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitShopPending,
      title: `${
        shopModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      onOk: data => {
        submitShop(data).then(data=> {
          shopModalChange(false,"create");
          this.fetchList();
        })
      },
      onCancel() {
        shopModalChange(false,"create");
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <ShopModal {...this.modalProps} />
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    demo: state.demo,
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
)(ShopListPage);
