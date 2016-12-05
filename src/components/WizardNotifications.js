import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox'

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
        width: 500,
        height: 300
    },
    select: {
        align: 'left'
    }
}


class WizardNotifications extends Component {
    render() {

        return (
            <MuiThemeProvider>
                <div style={styles.block}>
                    <Paper zDepth={0} style={styles.paper}>
                        <br />
                        <br />
                        <List>
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="notifySupervisorOnError"
                                    style={styles.checkbox}
                                    checked={this.props.definition.notifySupervisorOnError}
                                    onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Notify Supervisor on Error"
                                secondaryText="When an error occurs supervisors will be notified via email"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="notifySupervisorOnEnd"
                                    style={styles.checkbox}
                                    checked={this.props.definition.notifySupervisorOnEnd}
                                    onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Notify Supervisor On End"
                                secondaryText="When process ends execution supervisors will be notified via email"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="AssignSupervisorOnError"
                                    style={styles.checkbox}
                                    checked={this.props.definition.AssignSupervisorOnError}
                                    onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Assign to Supervisor On Error"
                                secondaryText="When an error occurs a task will be delivered to the supervisors"
                                />
                            <ListItem
                                leftCheckbox={<Checkbox
                                    id="blockProcessExecution"
                                    style={styles.checkbox}
                                    checked={this.props.definition.blockProcessExecution}
                                    onCheck={this.props.handleCheckChange}
                                    />}
                                primaryText="Block Process Execution"
                                secondaryText="When an error occurs the process stops executing"
                                />
                        </List>
                        <br />
                        <br />
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default WizardNotifications