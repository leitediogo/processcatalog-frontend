import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Table, TableRow, TableBody, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import IconDelete from 'material-ui/svg-icons/action/delete'
import IconEdit from 'material-ui/svg-icons/editor/mode-edit'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import TimePicker from 'material-ui/TimePicker'

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
    },
    smallIcon: {
        width: 20,
        height: 20
    }
}


class WizardFlow extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            tmpFlowName: '',
            tmpFlowType: '',
            tmpFlowTimer1: null,
            tmpFlowTimer2: null
        }
    }

    handleInputChange = (e) => {
        let change = this.state
        change[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleSelectChange = (event, index, value) => {
        let change = this.state
        change.tmpFlowType = value
        this.setState(change)
        console.log(this.state)
    }

    handleOpenModal = () => {
        this.setState({ open: true })
    }

    handleCloseModal = () => {
        this.setState({ open: false })
    }

    handleSendSaveFlow = () => {
        console.log('handleSendSaveFlow')
        //update global state
        this.props.handleSaveFlow(this.state.tmpFlowName, this.state.tmpFlowType, this.state.tmpFlowTimer1, this.state.tmpFlowTimer2)
        //close modal
        this.setState({ open: false })
        //reset tmps 
        this.setState({ tmpFlowName: '', tmpFlowType: '', tmpFlowTimer1: null, tmpFlowTimer2: null })
    }

    handleDeleteRow = (e) => {
        console.log(e)
        console.log(e.target)

    }

    handleEditRow = (e) => {
        console.log(e)
        console.log(e.target)
    }

    handleChangeTimePicker1 = (event, date) => {
        this.setState({ tmpFlowTimer1: date })
    }

    handleChangeTimePicker2 = (event, date) => {
        this.setState({ tmpFlowTimer2: date })
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
            onTouchTap={this.handleSendSaveFlow}
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
                                    <TableHeaderColumn>Order</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Actions</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} >
                                {this.props.definition.flow.map((row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{row.order}</TableRowColumn>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.type}</TableRowColumn>
                                        <TableRowColumn>
                                            <IconButton id="1" tooltip="Delete row" onTouchTap={this.handleDeleteRow.bind(this)} >
                                                <IconDelete />
                                            </IconButton>
                                            <IconButton tooltip="Edit row" onTouchTap={this.handleEditRow.bind(this)} >
                                                <IconEdit />
                                            </IconButton>
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Add Flow Step" onTouchTap={this.handleOpenModal} fullWidth={true} />
                        <Dialog
                            title="Add flow step"
                            actions={this.actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleCloseModal}
                            >
                            <TextField
                                id="tmpFlowName"
                                hintText="Insert Flow Step Name"
                                floatingLabelText="Process Flow Step Name"
                                value={this.state.tmpFlowName}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <SelectField
                                id="tmpFlowType"
                                style={styles.select}
                                floatingLabelText="Flow Step type"
                                value={this.state.tmpFlowType}
                                onChange={this.handleSelectChange.bind(this)}
                                >
                                <MenuItem value={'Human Approval Task'} primaryText="Human Approval" />
                                <MenuItem value={'Extract Web to excel'} primaryText="Extract Web to excel" />
                                <MenuItem value={'Copy File'} primaryText="Copy File" />
                                <MenuItem value={'Zip File'} primaryText="Zip File" />
                                <MenuItem value={'Send Email'} primaryText="Send Email" />
                                <MenuItem value={'Download from FTP'} primaryText="Download from FTP" />
                                <MenuItem value={'Populate and submit 3270'} primaryText="Populate and submit 3270" />
                                <MenuItem value={'Populate and submit webform'} primaryText="Populate and submit webform" />
                                <MenuItem value={'Get customer by VAT'} primaryText="Get customer by VAT" />
                                <MenuItem value={'Get accounts by VAT'} primaryText="Get accounts by VAT" />
                                <MenuItem value={'Block accounts by VAT'} primaryText="Block accounts by VAT" />
                            </SelectField>
                            <br />
                            <TimePicker
                                id="tmpFlowTimer1"
                                format="ampm"
                                hintText="Initial cuttoff hour"
                                floatingLabelText="Initial cuttoff"
                                value={this.state.tmpFlowTimer1}
                                onChange={this.handleChangeTimePicker1}
                                />
                            <TimePicker
                                id="tmpFlowTimer2"
                                format="ampm"
                                hintText="Final cuttoff hour"
                                floatingLabelText="Final cuttoff"
                                value={this.state.tmpFlowTimer2}
                                onChange={this.handleChangeTimePicker2}
                                />
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
export default WizardFlow