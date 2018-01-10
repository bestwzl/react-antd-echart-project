import React, { PureComponent} from 'react';
import { connect } from 'dva';

import {Form,Table, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col} from 'antd';
import './activityAmount.css'
const FormItem = Form.Item;
const createForm = Form.create;

const columns = [
{
    title: '日期',
    dataIndex: 'date'
}, {
    title: '理财红包',
    dataIndex: 'licai'
}, {
    title: '快活宝加息金额',
    dataIndex: 'kuaihuobao'
}, {
    title: '定期加息金额',
    dataIndex: 'dingqi'
}, {
    title: '体验金',
    dataIndex: 'tiyan'
}, {
    title: '二级邀请投资快活宝',
    dataIndex: 'erji'
}];

const data = [{
    key: '1',
    date: '2017/10/1',
    licai: 2000,
    kuaihuobao: 5000,
    dingqi: 3000,
    tiyan: 5000,
    erji:13000,
}, {
    key: '2',
    date: '2017/10/9',
    licai: 1000,
    kuaihuobao: 6000,
    dingqi: 7000,
    tiyan: 2000,
    erji:13000,
}, {
    key: '3',
    date: '2017/10/15',
    licai: 8000,
    kuaihuobao: 11000,
    dingqi: 13000,
    tiyan: 20000,
    erji:33000,
}];


const DateRange = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null
    };
  },
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  },
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  },
  onChange(field, value) {
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  },

  handleReset(e) {
      e.preventDefault();
      this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  
  

  render() {

    return (
      <div>
          <Row  style={{marginBottom: '30px'}}>
            <Col span="24">
                <Form form={this.props.form}>
                    <Row>
                         <Col span="6">
                              开始日期
                          </Col>
                          <Col span="6">
                              结束日期
                          </Col>
                    </Row>
                    <Row>
                            时间选择
                    </Row>
                    <Row>
                        <Col span="2">
                            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
                        </Col>
                        <Col span="2">
                            <Button type="ghost" onClick={this.handleReset}>清除</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
          </Row>

          <Row style={{marginBottom: '20px'}}>
            <Col span="24">
                <Table columns={columns} dataSource={data} size="small" bordered pagination={{pageSize: 10}}/>
            </Col>
          </Row>
      </div>
    )
  }
})

ReactDOM.render(<DateRange />, mountNode);