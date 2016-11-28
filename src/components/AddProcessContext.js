import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Table, TableRow, TableBody, TableRowColumn } from 'material-ui/Table'
import IconDelete from 'material-ui/svg-icons/action/delete'

const iconDelete = <IconDelete />;

const paperStyle = {
  margin: 20,
  textAlign: 'center'
}

const tableData = [
  {
    name: 'John Smith',
    status: 'Analyst'
  },
  {
    name: 'Mathew',
    status: 'Manager'
  }
]

class AddProcessContext extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      title: 'Initial state title',
      description: 'initial state description',
      type: 'initial state type',
      supervisor: 'init sup'
    }
  }

  handleChange(name, e) {
    let change = {}
    change[name] = e.target.value;
    this.setState(change);
    console.log(change);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Paper zDepth={1} style={paperStyle}>
            <TextField
              hintText="Insert Title"
              floatingLabelText="Title"
              value={this.state.title}
              onChange={this.handleChange.bind(this, "title")}
              ref="title"
              />
            <br />
            <TextField
              hintText="Insert Description"
              floatingLabelText="Description"
              value={this.state.description}
              onChange={this.handleChange.bind(this, "description")}
              />
            <br />
            <TextField
              hintText="Insert Type"
              floatingLabelText="Type"
              value={this.state.type}
              onChange={this.handleChange.bind(this, "type")}
              />
          </Paper>
          <Paper zDepth={1} style={paperStyle}>
            <TextField
              hintText="Insert Supervisor"
              floatingLabelText="Supervisor"
              value={this.state.supervisor}
              onChange={this.handleChange.bind(this, "supervisor")}
              />
            <FlatButton label="Add" href="/" />
            <br />
            <br />
            <Paper zDepth={1} style={paperStyle}>
              <Table>
                <TableBody displayRowCheckbox={false} >
                  {tableData.map((row, index) => (
                    <TableRow key={index} selected={row.selected}>
                      <TableRowColumn>{row.name}</TableRowColumn>
                      <TableRowColumn>{row.status}</TableRowColumn>
                      <TableRowColumn><FlatButton icon={iconDelete} href="/" /></TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AddProcessContext;