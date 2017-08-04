import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TaskEntry from './TaskEntry';
import getWeek from './utility/get-week';
import * as PROJECT_DATA from './projectData';

// 在window上定义一个id
// 后续代码里可以直接引用这个id

class DayEntry extends Component {

  state = {
    tasks: [{
      id: Date.now(),
      primary: true
    }]
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

  render() {
    // const
    // const childLists = this.state.tasks;
    const childNode = this.state.tasks.map(task => (
      <TaskEntry
        task={task}
        key={task.id}
        id={task.id}
        handleRemove={this.handleRemove}
        handleChange={this.props.handleChange}
        // id={this..id}
      />
    ));

    const weekdays = getWeek();

    return (
      <div>
        <h2>
          {PROJECT_DATA.weekDays[this.props.day]}
          <span>{weekdays[this.props.day].toLocaleDateString()}</span>
        </h2>
        <div>
          {childNode}
        </div>

        <FlatButton
          label="增加一项工作"
          fullWidth={true}
          onClick={() => this.handleAdd()}
        />
      </div>
    )
  }
}

export default DayEntry;