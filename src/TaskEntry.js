import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as PROJECT_DATA from './projectData';

class TaskEntry extends Component {

  state = {
    id: this.props.id,
    project: '',
    category: '',
    task: '',
    consumption: ''
  };

  handleProjectChange = (evt, index, value) => {
    this.setState({project: value})
  };

  handleTaskChange = (evt, index, value) => {
    this.setState({task: value? value: evt.target.value})
  };

  handleCategoryChange = (evt, index, value) => {
    this.setState({category: value})
  };

  handleConsumptionChange = (evt, index, value) => {
    this.setState({consumption: value})
  };

  componentDidMount() {
    this.props.handleChange(this.state)
  }

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
      <div>
        <SelectField
          floatingLabelText="选择项目"
          floatingLabelFixed={true}
          value={this.state.project}
          onChange={this.handleProjectChange}
          // maxHeight={200}
          name="project"
        >
          {projects}
        </SelectField>
        <SelectField
          floatingLabelText="选择工作内容"
          floatingLabelFixed={true}
          value={this.state.category}
          onChange={this.handleCategoryChange}
          // maxHeight={200}
          name="category"
        >
          {categories}
        </SelectField>
        { this.state.category !== '其他' &&
          <SelectField
            floatingLabelText="选择文件"
            floatingLabelFixed={true}
            maxHeight={200}
            value={this.state.task}
            onChange={this.handleTaskChange}
            name="task"
          >
            {tasks}
          </SelectField> }
        { this.state.category === '其他' &&
          <TextField
            floatingLabelText="输入工作内容描述"
            floatingLabelFixed={true}
            multiLine={true}
            rows={1}
            rowsMax={4}
            value={this.state.task}
            onChange={this.handleTaskChange}
            name="task"
          /> }
        <SelectField
          floatingLabelText="选择工作用时"
          floatingLabelFixed={true}
          value={this.state.consumption}
          onChange={this.handleConsumptionChange}
          // maxHeight={200}
          name="consumption"
        >
          {durations}
        </SelectField>
        {/*<TextField*/}
          {/*hintText="例如: 3.5"*/}
          {/*floatingLabelText="输入工时"*/}
          {/*floatingLabelFixed={true}*/}
          {/*name="consumption"*/}
        {/*/>*/}
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


