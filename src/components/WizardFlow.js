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
import Dialog from 'material-ui/Dialog'

const iconDelete = <IconDelete />

const styles = {
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


class WizardFlow extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            tmpFlowName: '',
            tmpFlowType: ''
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
        this.props.handleSaveFlow(this.state.tmpFlowName, this.state.tmpFlowType)
        //close modal
        this.setState({ open: false })
        //reset tmps 
        this.setState({ tmpFlowName: '', tmpFlowType: '' })
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
                                    <TableHeaderColumn>Action</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} >
                                {this.props.definition.flow.map((row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{row.order}</TableRowColumn>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.type}</TableRowColumn>
                                        <TableRowColumn><FlatButton icon={iconDelete} href="/" /></TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Add Flow" onTouchTap={this.handleOpenModal} fullWidth={true} />
                        <Dialog
                            title="Add flow"
                            actions={this.actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleCloseModal}
                            >
                            <TextField
                                id="tmpFlowName"
                                hintText="Insert Flow Name"
                                floatingLabelText="Process Flow Name"
                                value={this.state.tmpFlowName}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <SelectField
                                id="tmpFlowType"
                                style={styles.select}
                                floatingLabelText="Flow type"
                                value={this.state.tmpFlowType}
                                onChange={this.handleSelectChange.bind(this)}
                                >
                                <MenuItem value={'Human Approval'} primaryText="Human Approval" />
                                <MenuItem value={'Web Scraping'} primaryText="Web Scraping" />
                                <MenuItem value={'3270 Automation'} primaryText="3270 Automation" />
                                <MenuItem value={'File Read (Excel)'} primaryText="File Read (Excel)" />
                                <MenuItem value={'Get customer by VAT'} primaryText="Get customer by VAT" />
                                <MenuItem value={'Get accounts by VAT'} primaryText="Get accounts by VAT" />
                                <MenuItem value={'Block accounts'} primaryText="Block accounts" />
                            </SelectField>
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
export default WizardFlow