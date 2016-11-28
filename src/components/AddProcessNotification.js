import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

let style = {
    margin: 20,
    textAlign: 'center'
}

class AddProcessNotification extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Paper zDepth={1} style={style}>
                    <TextField
                        hintText="Insert Choice Id"
                        floatingLabelText="Choice Id"
                        //onChange={this.handleChange.bind(this, "id")}
                        />
                    <br />
                    <TextField
                        hintText="Insert Choice Title"
                        floatingLabelText="Choice Title"
                        //onChange={this.handleChange.bind(this, "title")}
                        />
                    <br />
                    <TextField
                        hintText="Insert Choice Descritption"
                        floatingLabelText="Choice Description"
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

export default AddProcessNotification;