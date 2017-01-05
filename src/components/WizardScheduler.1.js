import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'

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

const divStyleRight = {
    marginRight: 20,
    paddingTop: 10,
    float: 'right'
}

const divStyleLeft = {
}

class WizardScheduler extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div style={styles.block}>
                    <Paper zDepth={0} style={styles.paper}>
                        <List>
                            <div style={divStyleLeft}>
                                <ListItem
                                    leftCheckbox={<Checkbox
                                        id="isMailTrigger"
                                        style={styles.checkbox}
                                        //checked={this.props.definition.isMailTrigger}
                                        //onCheck={this.props.handleCheckChange}
                                        />}
                                    primaryText="Email monitor trigger"
                                    secondaryText="When specific email arrives"
                                    />
                            </div>
                            <div style={divStyleRight}>

                                <TextField
                                    id="name"
                                    hintText="Insert Process Name"
                                    floatingLabelText="Process Name"
                                    //value={this.props.definition.name}
                                    //onChange={this.props.handleDefinitionInputChange}
                                    />
                                <br />
                                <TextField
                                    id="description"
                                    hintText="Insert Process Description"
                                    floatingLabelText="Process Description"
                                    //value={this.props.definition.description}
                                    //onChange={this.props.handleDefinitionInputChange}
                                    multiLine={true}
                                    rows={2}
                                    />
                                <br />

                            </div>
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="isFileTrigger"
                                    style={styles.checkbox}
                                    //checked={this.props.definition.isFileTrigger}
                                    //onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="File monitor trigger"
                                secondaryText="When file exists in specified folder"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="isIdleTrigger"
                                    style={styles.checkbox}
                                    //checked={this.props.definition.isIdleTrigger}
                                    //onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Idle monitor trigger"
                                secondaryText="When user is inactive over a specified period of time"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="isManualTrigger"
                                    style={styles.checkbox}
                                    //checked={this.props.definition.isManualTrigger}
                                    //onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Manual trigger"
                                secondaryText="When user starts the process"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="isPingTrigger"
                                    style={styles.checkbox}
                                    //checked={this.props.definition.isPingTrigger}
                                    //onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Ping trigger"
                                secondaryText="When machine fails to answer"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="isProcessTrigger"
                                    style={styles.checkbox}
                                    //checked={this.props.definition.isProcessTrigger}
                                    //onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Process trigger"
                                secondaryText="When specified process starts or ends"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="isTimeElapsedTrigger"
                                    style={styles.checkbox}
                                    //checked={this.props.definition.isTimeElapsedTrigger}
                                    //onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Time Elapsed trigger"
                                secondaryText="When specified time arrives"
                                />
                            <br />
                            <br />
                        </List>
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default WizardScheduler