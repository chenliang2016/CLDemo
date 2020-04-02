import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { FormBuilder } from '../../components'

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
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk,elements, form, ...modalProps } = this.props

    const formMeta = {
      colon: true,
      columns: 1,
      formItemLayout: formItemLayout,
      elements: elements
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

const WrapperModal = Form.create({ name: 'form_modal' })(FormModal);

export default WrapperModal;