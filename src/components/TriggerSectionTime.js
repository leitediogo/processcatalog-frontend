import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

class TriggerSectionTime extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            firePeriod: '',
            starting: new Date()
        }
        this.handleFirePeriodSelect = this.handleFirePeriodSelect.bind(this)
    }

    //TODO: not saving to decision
    handleFirePeriodSelect = (event, index, value) => {
        let change = this.state
        change.firePeriod = value
        this.setState(change)
        console.log(this.state)
    }


    render() {
        return (
            <div>
                <SelectField
                    id="firePeriod"
                    floatingLabelText="Period"
                    value={this.state.firePeriod}
                    onChange={this.handleFirePeriodSelect}
                >
                    <MenuItem value={'Daily'} primaryText="Daily" />
                    <MenuItem value={'Weekly'} primaryText="Weekly" />
                    <MenuItem value={'Monthly'} primaryText="Monthly" />
                    <MenuItem value={'Yearly'} primaryText="Yearly" />
                </SelectField>
                <DatePicker
                    hintText="Starting..."
                    container="inline"
                //value={this.state.starting}
                //onChange={this.handleFirePeriodSelect}
                />

                <br />
            </div>
        );
    }
}

export default TriggerSectionTime;