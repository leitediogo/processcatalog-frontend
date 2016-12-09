import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Table, TableRow, TableBody, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import IconDelete from 'material-ui/svg-icons/action/delete'
import Dialog from 'material-ui/Dialog'

const iconDelete = <IconDelete />

const styles = {
    paper: {
        margin: 20,
        textAlign: 'left',
        display: 'inline-block',
        width: 800,
        height: 300
    },
    select: {
        align: 'left'
    }
}


class WizardSupervisor extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            tmpSupervisorName: '',
            tmpSupervisorFunc: ''
        }
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleOpenModal = () => {
        this.setState({ open: true })
    }

    handleCloseModal = () => {
        this.setState({ open: false })
    }

    handleSendSaveSupervisor = () => {
        console.log('handleSendSaveFlow')
        //update global state
        this.props.handleSaveSupervisor(this.state.tmpSupervisorName, this.state.tmpSupervisorFunc)
        //close modal
        this.setState({ open: false })
        //reset tmps 
        this.setState({ tmpSupervisorName: '', tmpSupervisorFunc: '' })
    }

    actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleCloseModal}
            />,
        <FlatButton
            label="Save"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSendSaveSupervisor}
            />
    ]

    render() {

        return (
            <MuiThemeProvider>
                <div>
                    <Paper zDepth={0} style={styles.paper}>
                        <Table>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                enableSelectAll={false}
                                >
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Function</TableHeaderColumn>
                                    <TableHeaderColumn>Action</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} >
                                {this.props.definition.supervisorTeam.map((row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.function}</TableRowColumn>
                                        <TableRowColumn><FlatButton icon={iconDelete} href="/" /></TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Add Supervisor" onTouchTap={this.handleOpenModal} fullWidth={true} />
                        <Dialog
                            title="Add Supervisor"
                            actions={this.actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleCloseModal}
                            >
                            <TextField
                                id="tmpSupervisorName"
                                hintText="Insert Supervisor Name"
                                floatingLabelText="Supervisor Name"
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <TextField
                                id="tmpSupervisorFunc"
                                hintText="Insert Supervisor Function"
                                floatingLabelText="Supervisor Function"
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <br />
                            <br />
                        </Dialog>
                        <br />
                        <br />
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default WizardSupervisor