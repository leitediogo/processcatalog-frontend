import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

const style = {
    width: 100
}
class TriggerSectionPing extends Component {

    render() {
        return (
            <div>
                <TextField
                    id="ping"
                    hintText="Host"
                    floatingLabelText="Host"
                    />
                <br />
                <TextField
                    id="timeout"
                    hintText="Timeout"
                    floatingLabelText="Timeout"
                    />
                <br />
                <TextField
                    id="every"
                    hintText="Every"
                    floatingLabelText="Ping every"
                    style={style}
                    /> Minute
                <br />
                <br />
            </div>
        );
    }
}

export default TriggerSectionPing;