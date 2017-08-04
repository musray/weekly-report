import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import DayEntry from './DayEntry';
import * as PROJECT_DATA from './projectData';
import sortBy from 'sort-by';
// import serializeForm from 'form-serialize';

class App extends Component {

  state = {
    data: [],
    daySpan: '',
    user: ''
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const showup = JSON.stringify(this.state.data);
    alert(showup);
  };

  handleChange = (target) => {
    let presence = false;
    for (const item of this.state.data) {
      if (item.id === target.id) {
        presence = true;
      }
    }

    if (presence) {
      this.setState(state => {
        let next = this.state.data;
        next = next.map(item => {
          if (item.id === target.id) {
            return target;
          } else {
            return item;
          }
        });
        console.log(next);

        return {data: next}
      })
    } else {
      this.setState(state => ({data: state.data.concat([target])}))
    }
  };

  handleDaySpanSelect = (evt, index, value) => {
    this.setState({daySpan: value})
  };

  handleUserSelect = (evt, index, value) => {
    this.setState({user: value})
  };

  render() {

    const weekdays = [0, 1, 2, 3, 4, 5, 6];
    const users = PROJECT_DATA.users.sort(sortBy('name'));
    const userMenuItems = [];


    for (const item of users) {
      userMenuItems.push(<MenuItem value={item.name} key={users.indexOf(item)} primaryText={item.name} />)
    }

    return (
      <div>
        <h1>周报系统</h1>

        {/* 周数选择；本周=0， 上周=1 */}
        <SelectField
          floatingLabelText="周选择"
          floatingLabelFixed={true}
          value={this.state.daySpan}
          onChange={this.handleDaySpanSelect}
        >
          <MenuItem value={1} primaryText="本周" />
          <MenuItem value={0} primaryText="上周" />
        </SelectField>

        {/* 用户选择 */}
        <SelectField
          floatingLabelText="填报人"
          floatingLabelFixed={true}
          value={this.state.user}
          onChange={this.handleUserSelect}
        >
          {userMenuItems}
        </SelectField>

        <form onSubmit={this.handleSubmit}>

          {weekdays.map((item) => {
            return ( <DayEntry
                key={item}
                day={item}
                daySpan={this.state.daySpan}
                handleChange={this.handleChange}
              /> )
          })}

          <FlatButton
            label="提交"
            primary={true}
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default App;
