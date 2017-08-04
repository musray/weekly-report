import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TaskEntry from './TaskEntry';
import Toggle from 'material-ui/Toggle';
import { toggleStyles } from './style/styles';
import getWeek from './utility/get-week';
import * as PROJECT_DATA from './projectData';

// 在window上定义一个id
// 后续代码里可以直接引用这个id

class DayEntry extends Component {

  state = {
    tasks: [{
      id: Date.now(),
      primary: true
    }],
    absence: false
  };

  handleAdd = () => {
    this.setState(state => ({
      tasks: state.tasks.concat([{id: Date.now(), primary: false}])
    }))
  };

  handleRemove = (id) => {
    const taskList = this.state.tasks;
    const filteredList = taskList.filter(task => task.primary === true || task.id !== id);

    this.setState({tasks: filteredList})
  };

  handleChangeActive = () => {
    this.setState({absence: !this.state.absence})
  };

  render() {
    // const
    // const childLists = this.state.tasks;
    let absence = this.state.absence;
    const childNode = this.state.tasks.map(task => (
      <TaskEntry
        task={task}
        key={task.id}
        id={task.id}
        absence={absence}
        handleRemove={this.handleRemove}
        handleChange={this.props.handleChange}
        // id={this..id}
      />
    ));

    const weekdays = getWeek(this.props.lastweek);

    return (
      <div>
        <h2>
          {PROJECT_DATA.weekDays[this.props.day]}
          <span>{weekdays[this.props.day].toLocaleDateString()}</span>
        </h2>

        <div style={toggleStyles.block}>
          <Toggle
            label="休假"
            style={toggleStyles.toggle}
            onClick={this.handleChangeActive}
          />
        </div>

        {/*{this.state.active &&*/}
        {/*}*/}
        <div>
          {childNode}
        </div>

        <FlatButton
          label="增加一项工作"
          fullWidth={true}
          onClick={() => this.handleAdd()}
          disabled={this.state.absence}
        />
      </div>
    )
  }
}

export default DayEntry;