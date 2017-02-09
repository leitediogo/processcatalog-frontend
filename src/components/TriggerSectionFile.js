import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class TriggerSectionFile extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            fileEvent: ''
        }
        this.handlefileEventSelect = this.handlefileEventSelect.bind(this)
    }

    //TODO: not saving to decision
    handlefileEventSelect = (event, index, value) => {
        let change = this.state
        change.fileEvent = value
        this.setState(change)
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <TextField
                    id="pathToFile"
                    hintText="Insert Path to File"
                    floatingLabelText="Path to File"
                />
                <br />
                <SelectField
                    id="fileEvent"
                    floatingLabelText="Event"
                    value={this.state.fileEvent}
                    onChange={this.handlefileEventSelect}
                >
                    <MenuItem value={'Created'} primaryText="Created" />
                    <MenuItem value={'Changed'} primaryText="Changed" />
                    <MenuItem value={'Deleted'} primaryText="Deleted" />
                    <MenuItem value={'Renamed'} primaryText="Renamed" />
                </SelectField>
                <br />
            </div>
        );
    }
}

export default TriggerSectionFile;