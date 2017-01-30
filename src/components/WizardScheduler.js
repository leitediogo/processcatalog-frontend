import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TriggerSectionEmail from './TriggerSectionEmail'
import TriggerSectionFile from './TriggerSectionFile'
import TriggerSectionIdle from './TriggerSectionIdle'
import TriggerSectionManual from './TriggerSectionManual'
import TriggerSectionProcess from './TriggerSectionProcess'
import TriggerSectionTime from './TriggerSectionTime'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'black',
  }
})

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    paper: {
        margin: 20,
        textAlign: 'left',
        display: 'inline-block',
        width: 800,
        height: 300
    },
    nestedPaper: {
        height: 100,
        width: 300,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block'
    },
    nestedPaperHidden: {
        visibility: 'hidden'
    },
    select: {
        align: 'left'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 600,
        height: 600,
        overflowY: 'auto',
    }
}

class WizardScheduler extends Component {

    constructor() {
        super()
        this.state = {
            showMail: false,
            showFile: false
        }
    }

    render() {
        let triggerSection = ''
        switch (this.props.definition.scheduleType) {
            case 'Email monitor':
                triggerSection = <TriggerSectionEmail />
                break
            case 'File monitor':
                triggerSection = <TriggerSectionFile />
                break
            case 'Idle monitor':
                triggerSection = <TriggerSectionIdle />
                break
            case 'Manual':
                triggerSection = <TriggerSectionManual />
                break
            case 'Process':
                triggerSection = <TriggerSectionProcess />
                break
            case 'Time Elapsed':
                triggerSection = <TriggerSectionTime />
                break
            default:
                break
        }

        return (
             <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.block}>
                    <Paper zDepth={0} style={styles.paper}>
                        <SelectField
                            id="scheduleType"
                            style={styles.select}
                            floatingLabelText="Trigger"
                            value={this.props.definition.scheduleType}
                            onChange={this.props.handleDefinitionScheduleTypeChange}
                            >
                            <MenuItem value={'Email monitor'} primaryText="Email monitor" />
                            <MenuItem value={'File monitor'} primaryText="File monitor" />
                            <MenuItem value={'Idle monitor'} primaryText="Idle monitor" />
                            <MenuItem value={'Manual'} primaryText="Manual" />
                            <MenuItem value={'Process'} primaryText="Process" />
                            <MenuItem value={'Time Elapsed'} primaryText="Time Elapsed" />
                        </SelectField>
                        <br />
                        <br />
                        <br />
                        {triggerSection}
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default WizardScheduler