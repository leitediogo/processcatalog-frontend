import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class TriggerSectionProcess extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            process: '',
            processEvent: ''
        }
        this.handleProcessSelect = this.handleProcessSelect.bind(this)
        this.handleProcessEventSelect = this.handleProcessEventSelect.bind(this)
    }

    //TODO: not saving to decision
    handleProcessSelect = (event, index, value) => {
        let change = this.state
        change.process = value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: not saving to decision
    handleProcessEventSelect = (event, index, value) => {
        let change = this.state
        change.processEvent = value
        this.setState(change)
        console.log(this.state)
    }


    render() {
        return (
            <div>
                <SelectField
                    id="process"
                    floatingLabelText="Process"
                    value={this.state.process}
                    onChange={this.handleProcessSelect}
                >
                    <MenuItem value={'Insolvency Management'} primaryText="Insolvency Management" />
                    <MenuItem value={'Claims Request'} primaryText="Claims Request" />
                </SelectField>
                <br />
                <SelectField
                    id="processEvent"
                    floatingLabelText="Event"
                    value={this.state.processEvent}
                    onChange={this.handleProcessEventSelect}
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