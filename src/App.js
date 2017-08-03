import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import DayEntry from './DayEntry';
import serializeForm from 'form-serialize';
import * as _ from 'underscore';


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
