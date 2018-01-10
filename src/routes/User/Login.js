import React,{Component} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Icon, Input, Button, Checkbox, Modal, Alert, message} from 'antd';
import fetch from 'dva/fetch';
import style from './Login.css';

const FormItem = Form.Item;

@connect(state => ({
  login: state.login,
}))


class NormalLoginForm extends React.Component {
    state = {
        autoLogin: true,
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields({ force: true },
        (err, values) => {
          if (!err) {
           this.props.dispatch({
              type: 'login/login',
              payload: {
                userName : values.userName,
                password : values.password
              }
          });
        }
        }
      );
    }

  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className={style.login_page}>
            <div className={style.login_wrapper}>    
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username! Dear' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账号" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password! Dear'}],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                      })(
                        <Checkbox>记住账号</Checkbox>
                      )}
                      <a className="login-form-forgot" href="javascript:;" style={{ float: 'right' }}>忘记密码</a>
                      <div className={style.sub_btn}>
                          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%",position:"absolute"}}>
                            登录
                          </Button>
                      </div>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default(WrappedNormalLoginForm);
