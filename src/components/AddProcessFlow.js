import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

let style = {
    margin: 20,
    textAlign: 'center'
}

class AddProcessFlow extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Paper zDepth={1} style={style}>
                    <TextField
                        hintText="Insert Criteria Id"
                        floatingLabelText="Criteria Id"
                        //onChange={this.handleChange.bind(this, "id")}
                        />
                    <br />
                    <TextField
                        hintText="Insert Criteria Title"
                        floatingLabelText="Criteria Title"
                        //onChange={this.handleChange.bind(this, "title")}
                        />
                    <br />
                    <TextField
                        hintText="Insert Criteria Descritption"
                        floatingLabelText="Criteria Description"
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

export default AddProcessFlow;