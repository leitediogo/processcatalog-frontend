import React, { Component } from 'react';
import TextField from 'material-ui/TextField'

const style = {
    width: 50
}

class TriggerSectionEmail extends Component {
    render() {
        return (
            <div>
                <TextField
                    id="mailServer"
                    hintText="Insert Server"
                    floatingLabelText="Server"
                />
                <TextField
                    id="port"
                    hintText="Port"
                    floatingLabelText="Port"
                    style={style}
                />
                <br />
                <TextField
                    id="user"
                    hintText="Insert User"
                    floatingLabelText="User"
                />
                <br />
                <TextField
                    id="password"
                    hintText="Insert Password"
                    floatingLabelText="Password"
                    type="password"
                />
                <br />
                <TextField
                    id="from"
                    hintText="Check for emails from"
                    floatingLabelText="Check for emails from"
                    fullWidth={true}
                />
                <br />
                <TextField
                    id="where"
                    hintText="Check for emails where subject contains"
                    floatingLabelText="Check for emails where subject contains"
                    fullWidth={true}
                />
                <br />
                <br />
            </div>
        );
    }
}

export default TriggerSectionEmail;