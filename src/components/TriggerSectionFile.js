import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class TriggerSectionFile extends Component {
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