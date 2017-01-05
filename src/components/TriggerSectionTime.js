import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

class TriggerSectionTime extends Component {
    render() {
        return (
            <div>
                <SelectField
                    id="firePeriod"
                    floatingLabelText="Period"
                    >
                    <MenuItem value={'Daily'} primaryText="Daily" />
                    <MenuItem value={'Weekly'} primaryText="Weekly" />
                    <MenuItem value={'Monthly'} primaryText="Monthly" />
                    <MenuItem value={'Yearly'} primaryText="Yearly" />
                </SelectField>
                <DatePicker hintText="Starting..." container="inline" />

                <br />
            </div>
        );
    }
}

export default TriggerSectionTime;