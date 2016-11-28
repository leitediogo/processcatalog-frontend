import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

let style = {
    margin: 20,
    textAlign: 'center'
}

class AddProcessExceptionHandling extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Paper zDepth={1} style={style}>
                    <TextField
                        hintText="Insert Participant Id"
                        floatingLabelText="Participant Id"
                        //onChange={this.handleChange.bind(this, "id")}
                        />
                    <br />
                    <TextField
                        hintText="Insert Participant Title"
                        floatingLabelText="Participant Title"
                        //onChange={this.handleChange.bind(this, "title")}
                        />
                    <br />
                    <TextField
                        hintText="Insert Participant Descritption"
                        floatingLabelText="Participant Description"
                        //onChange={this.handleChange.bind(this, "description")}
                        />
                    <br />
                    <br />
                    <FlatButton label="Add" href="/" />
                    <FlatButton label="Remove" href="/" />

                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default AddProcessExceptionHandling;