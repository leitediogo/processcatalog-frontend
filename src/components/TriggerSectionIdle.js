import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

const style = {
    width: 100
}

class TriggerSectionIdle extends Component {
    render() {
        return (
            <div>
                <TextField
                    id="userInactive"
                    hintText="Inactive"
                    floatingLabelText="Inactive for"
                    style={style}
                /> Mins
                <br />
                <br />
            </div>
        );
    }
}

export default TriggerSectionIdle;