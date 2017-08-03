import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import DayEntry from './DayEntry';
import serializeForm from 'form-serialize';


class App extends Component {

  state = {
    data: []
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const formValues = serializeForm(evt.target, { hash6: true });
  };

  // state.data是每周所有task的array
  // task是一个这样的object: {id: 0, day: 0, task: '', active: true, consumption: 3.5}
  // 当<TaskEntry>有change的时候，通过handleChange来更新App的state
  // TODO: <TaskEntry/> 的每一个实例，都要生成一个唯一的，真正的id
  // TODO: 看看window.taskid到底放到哪合适
  handleChange = (target) => {
    this.setState(state => {
      const next = state.data.map(item => {
        if (target.day === item.day) {
          return target;
        } else {
          return item
        }
      });
      return {data: next}
    });
  };

  render() {

    const weekdays = [0, 1, 2, 3, 4, 5, 6];

    return (
      <div>
        <h1>周报系统</h1>

        <form onSubmit={this.handleSubmit}>

          {weekdays.map((item) => {
            return ( <DayEntry
                key={item}
                day={item}
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
