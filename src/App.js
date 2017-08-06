import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DayEntry from './DayEntry';
import * as PROJECT_DATA from './projectData';
import sortBy from 'sort-by';
// import serializeForm from 'form-serialize';

class App extends Component {

  state = {
    data: [],
    lastweek: false,
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

  handleWeekSelect = (evt, index, value) => {
    this.setState({lastweek: value})
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
      <div className="App">
        <div className="App-header">
          <h1>周报填写</h1>

          <div className="App-header-container">
            {/* 周数选择；本周=0， 上周=1 */}
            <SelectField
              floatingLabelText="周选择"
              floatingLabelFixed={true}
              value={this.state.lastweek}
              onChange={this.handleWeekSelect}
            >
              <MenuItem value={false} primaryText="本周" />
              <MenuItem value={true} primaryText="上周" />
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
          </div>

        </div>
        <div className="week-container">
          <form onSubmit={this.handleSubmit}>

            {weekdays.map((item) => {
              return ( <DayEntry
                key={item}
                day={item}
                lastweek={this.state.lastweek}
                handleChange={this.handleChange}
              /> )
            })}

            <RaisedButton
              className="wide-btn-text"
              label="确认提交"
              primary={true}
              type="submit"
              fullWidth={true}
              buttonStyle={{height: "60px", margin: 0, padding: 0}}
              style={{letterSpacing: "5px", marginTop: "20px"}}
            />
          </form>

        </div>

        <div className="App-footer">
          <p className="footer-caption">周报填写系统 v0.1</p>
        </div>
      </div>
    );
  }
}

export default App;
