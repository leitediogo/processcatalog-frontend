import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class TriggerSectionProcess extends Component {
    render() {
        return (
            <div>
                <SelectField
                    id="process"
                    floatingLabelText="Process"
                    >
                    <MenuItem value={'Insolvency Management'} primaryText="Insolvency Management" />
                    <MenuItem value={'Claims Request'} primaryText="Claims Request" />
                </SelectField>

                <SelectField
                    id="processEvent"
                    floatingLabelText="Event"
                    >
                    <MenuItem value={'Starts'} primaryText="Starts" />
                    <MenuItem value={'Ends'} primaryText="Ends" />
                    <MenuItem value={'Exception'} primaryText="Exception" />
                </SelectField>

            </div>
        );
    }
}

export default TriggerSectionProcess;