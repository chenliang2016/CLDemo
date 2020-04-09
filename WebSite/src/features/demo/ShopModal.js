import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { FormBuilder,Upload } from '../../components'

const { UploadFile } = Upload;


const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class FormModal extends Component {
  static propTypes = {

  };

  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      console.log(data);
      // onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props

    const formMeta = {
      colon: true,
      columns: 1,
      formItemLayout: formItemLayout,
      elements: [
        {
          key: "name",
          label: "店铺名",
          initialValue: item.name,
          widget: Input,
          required: true
        },
        {
          key: "contactMan",
          label: "联系人",
          initialValue: item.contactMan,
          widget: Input,
          required: true
        },
        {
          key: "address",
          label: "联系地址",
          initialValue: item.address,
          widget: Input,
          required: true
        },
        {
          key: "phone",
          label: "联系电话",
          initialValue: item.phone,
          widget: Input,
          required: true
        },
        {
          key: "img",
          label: "上传图片",
          initialValue: [
            {
              name:'0.png',
              url:'1111',
            }
          ],
          widget: UploadFile,
          widgetProps: {
            action:'/api/qiniu',
            single: true,
            listType: 'picture'
          },
          required: true
        },
      ]
    };

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormBuilder meta={formMeta} form={form} />
        </Form>
      </Modal>
    )
  }
}

const WrapperModal = Form.create({ name: 'shop_modal' })(FormModal);

export default WrapperModal;
