import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TaskEntry from './TaskEntry';

// 在window上定义一个id
// 后续代码里可以直接引用这个id
window.taskid = 0;

class DayEntry extends Component {

  state = {
    tasks: [{
      id: 0,
      primary: true
    }]
  };

  handleAdd = () => {
    this.setState(state => ({
      tasks: state.tasks.concat([{id: ++window.taskid, primary: false}])
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
      <TaskEntry task={task} key={task.id} handleRemove={this.handleRemove} />
    ));
    return (
      <div>
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