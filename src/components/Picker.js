import { DatePicker, Button } from 'antd';

export default class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    sdate: "",
    edate: "",
  };

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() < endValue.valueOf() - 2678400000;
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return (endValue.valueOf() > (startValue.valueOf() + 2678400000)) || (endValue.valueOf() <= startValue.valueOf())
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value, date) => {
  	this.state.sdate = date;
    this.onChange('startValue', value);
  }

  onEndChange = (value, date) => {
  	this.state.edate = date;
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  
	handleClick = () => {
		let {sdate, edate} = this.state
		if(!sdate || !edate){
			return
		}
		this.props.handleSearch(sdate, edate)
	}

  render() {
  	//console.log(this.props)
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
      	<div>
	        <DatePicker
	          disabledDate={this.disabledStartDate}
	          format="YYYY-MM-DD"
	          value={startValue}
	          placeholder="开始日期"
	          onChange={this.onStartChange}
	          onOpenChange={this.handleStartOpenChange}
	        />
	        <span>&nbsp;</span> ~ <span>&nbsp;</span>
	        <DatePicker
	          disabledDate={this.disabledEndDate}
	          format="YYYY-MM-DD"
	          value={endValue}
	          placeholder="结束日期"
	          onChange={this.onEndChange}
	          onOpenChange={this.handleEndOpenChange}
	        />
	      </div>      
      	<Button type="primary" style={{marginTop: 10}} onClick={this.handleClick}>搜索</Button>
      </div>
    );
  }
}