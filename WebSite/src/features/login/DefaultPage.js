import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Button, Row, Form, Icon, Input } from 'antd'
const FormItem = Form.Item

class DefaultPage extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      this.props.actions.login();

      // dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    let footerLinks = [
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]
    
    return (
      <Fragment>
        <div className="form">
          <div className="logo">
            <span>后台管理</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder="请输入密码"
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
              >
                  登录
              </Button>
            </Row>
          </form>
        </div>
        <div className="footer">
        </div>
      </Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(DefaultPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
