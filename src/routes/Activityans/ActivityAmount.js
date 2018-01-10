//用户增长分析
import React, { Component } from 'react';
//import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Chart, Axis, Tooltip, Geom, Legend} from "bizcharts";
import DataSet from '@antv/data-set';
//import PageHeaderLayout from '../../layouts/PageHeaderLayout';
//import styles from './style.less';
import DateRange from '../../components/Picker';
import {
  Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Menu, Dropdown, Button,
} from 'antd';
const { RangePicker } = DatePicker;




@connect(state => ({
  userans: state.userans,
}))
export default class IncreaseAns extends Component {
  state = {
    tableData: [],
    barChartData: [],
    lineChartData: [],
    startTime : "",
    stopTime : "",
    }
  componentDidMount() {
    let now = moment();
    let stop = now.format('YYYY-MM-DD')
    let start = now.subtract(15, 'days').format('YYYY-MM-DD')
    this.state = {
      ...this.state,
      startTime : start,
      stopTime : stop
    }
      this.props.dispatch({
        type: 'activityAmount/fetchGrowAnalysis',
        payload: {
          startRow : start,
          stopRow  : stop
        }
      });
    }
  
  componentWillReceiveProps(newprops) {
    let {status, data} = newprops.userans;
    if(status != 1){
      return
    }
    let barChartData = this.formatBarData(data);
    let lineChartData = this.formatLineData(data);
    
    this.setState({
      tableData : data,
      barChartData: barChartData,
      lineChartData: lineChartData,
    })
  }

  handleSearch = (sdate, edate) => {
    this.props.dispatch({
        type: 'userans/fetchGrowAnalysis',
        payload: {
          startRow : sdate,
          stopRow  : edate
        }
      });
    }

    formatBarData = (data) => {
      let arr = [];
      let sp = [];
      let dateStr = "";
      data.map((item, index) => {
        sp = item.cdate.split("-")
        dateStr = sp[0] + "年" + sp[1] + "月" + sp[2] + "日";
        arr.push({ name:'累计注册用户数', date: dateStr, userAmount: Number(item.total_number_register_people) });
      arr.push({ name:'累计绑卡用户数', date: dateStr, userAmount: Number(item.total_bind_card_people) });
      arr.push({ name:'累计投资用户数', date: dateStr, userAmount: Number(item.total_number_invest_people) });
      })
      return arr;
  }
  
  formatLineData = (data) => {
      let arr = [];
      let sp = [];
      let dateStr = "";
      data.map((item, index) => {
        sp = item.cdate.split("-")
        dateStr = sp[0] + "年" + sp[1] + "月" + sp[2] + "日";
        arr.push({ name:'当日注册用户数', date: dateStr, userAmount: Number(item.number_register_people) });
      arr.push({ name:'当日绑卡用户数', date: dateStr, userAmount: Number(item.bind_card_people) });
      arr.push({ name:'当日投资用户数', date: dateStr, userAmount: Number(item.number_invest_people) });
        arr.push({ name:'当日注册并投资数', date: dateStr, userAmount: Number(item.total_regi_invest_people) });
      })
      return arr;
  }
  

  render() {
    //const { rangePickerValue, salesType, currentTabKey } = this.state;
    //const { chart } = this.props;
    
  const columns = [{
    title: '日期',
    dataIndex: 'cdate',
    width: 105,
  }, {
    title: '当日注册用户数',
    dataIndex: 'number_register_people',
  }, {
    title: '当日绑卡用户数',
    dataIndex: 'bind_card_people',
  },{
    title: '当日投资用户数',
    dataIndex: 'number_invest_people',
  },{
    title: '当日注册并投资数',
    dataIndex: 'total_regi_invest_people',
  },{
    title: '累计注册用户数',
    dataIndex: 'total_number_register_people',
  },{
    title: '累计绑卡用户数',
    dataIndex: 'total_bind_card_people',
  },{
    title: '累计投资用户数',
    dataIndex: 'total_number_invest_people',
  },{
    title: '累计注册未投资人数',
    dataIndex: 'total_regi_notinvest_people',
  },{
    title: '注册用户绑卡比',
    dataIndex: 'rate_bind_card',
  },];
  
  
    return (
      <div>
        <Card loading={false} bordered={false} bodyStyle={{ padding: 0 }}>
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
            <DateRange handleSearch={this.handleSearch}/>
              </div>
            </Col>
          </Row>
        </Card>
        <Card loading={false} bordered={false} bodyStyle={{ padding: 0 }} style={{ marginTop: 32 }}>
          <Table columns={columns} dataSource={this.state.tableData} bordered={true} pagination={false} />
        </Card>
      </div>
    )
  }
}
