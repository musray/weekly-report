import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as PROJECT_DATA from './utility/project-data';

class TaskEntry extends Component {

  state = {
    id: this.props.id,
    project: '',
    category: '',
    task: '',
    consumption: '',
    remark: '',
    absence: this.props.absence
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.absence) {
      this.setState({
        project: '',
        category: '',
        task: '',
        consumption: '',
        absence: nextProps.absence
      })
    } else {
      this.setState({
        absence: nextProps.absence
      })
    }
  }

  handleProjectChange = (evt, index, value) => {
    this.setState({project: value}, () =>
      this.props.handleChange(this.state))
  };

  handleTaskChange = (evt, index, value) => {
    this.setState({task: value? value: evt.target.value}, () =>
      this.props.handleChange(this.state))
  };

  handleCategoryChange = (evt, index, value) => {
    this.setState({category: value}, () =>
      this.props.handleChange(this.state))
  };

  handleConsumptionChange = (evt, index, value) => {
    this.setState({consumption: value}, () =>
      this.props.handleChange(this.state))
  };

  handleRemarkChange = (evt, index, value) => {
    this.setState((state) => ({remark: state.remark? state.remark + value: value}), () =>
      this.props.handleChange(this.state))
  };

  // componentDidMount() {
  //   this.props.handleChange(this.state)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(this.state.id + ' yes it\'s get updated');
  // }

  render() {
    const projects = [];
    const tasks = [];
    const categories = [];
    const durations = [];

    for (const project of PROJECT_DATA.projects) {
      projects.push(<MenuItem value={project} key={PROJECT_DATA.projects.indexOf(project)} primaryText={project} />)
    }
    for (const item of PROJECT_DATA.documents) {
      tasks.push(<MenuItem value={item} key={PROJECT_DATA.documents.indexOf(item)} primaryText={item} />)
    }
    for (const item of PROJECT_DATA.categories) {
      categories.push(<MenuItem value={item} key={PROJECT_DATA.categories.indexOf(item)} primaryText={item} />)
    }
    for (const item of PROJECT_DATA.durations) {
      durations.push(<MenuItem value={item} key={PROJECT_DATA.durations.indexOf(item)} primaryText={item} />)
    }

    return (
      <div className="task-container">
        <SelectField
          className="input-field"
          floatingLabelText="选择项目"
          floatingLabelFixed={true}
          value={this.state.project}
          onChange={this.handleProjectChange}
          maxHeight={300}
          name="project"
          disabled={this.state.absence}
        >
          {projects}
        </SelectField>
        <SelectField
          className="input-field"
          floatingLabelText="选择工作内容"
          floatingLabelFixed={true}
          value={this.state.category}
          onChange={this.handleCategoryChange}
          maxHeight={300}
          name="category"
          disabled={this.state.absence}
        >
          {categories}
        </SelectField>
        <SelectField
          className="input-field"
          floatingLabelText="选择文件"
          floatingLabelFixed={true}
          maxHeight={300}
          value={this.state.task}
          onChange={this.handleTaskChange}
          name="task"
          disabled={this.state.absence}
        >
          {tasks}
        </SelectField>
        <SelectField
          className="input-field"
          floatingLabelText="选择工作用时"
          floatingLabelFixed={true}
          value={this.state.consumption}
          onChange={this.handleConsumptionChange}
          maxHeight={300}
          name="consumption"
          disabled={this.state.absence}
        >
          {durations}
        </SelectField>
        <TextField
          className="input-field"
          floatingLabelText="备注"
          floatingLabelFixed={true}
          multiLine={true}
          rows={2}
          rowsMax={4}
          value={this.state.remark}
          onChange={this.handleRemarkChange}
          name="remark"
          disabled={this.state.absence}
        />
        <FlatButton
          label="X"
          secondary={true}
          onClick={(evt) => this.props.handleRemove(this.props.task.id)}
          disabled={this.props.task.primary}
        />
      </div>
    )
  }
}

export default TaskEntry;


