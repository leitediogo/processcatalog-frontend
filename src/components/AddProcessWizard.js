import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Table, TableRow, TableBody, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import IconDelete from 'material-ui/svg-icons/action/delete'
import Checkbox from 'material-ui/Checkbox';
import agent from 'superagent'
import Dialog from 'material-ui/Dialog';
import Link from 'react-router'
const iconDelete = <IconDelete />

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

const tableDataSupervisorTeam = [
    {
        name: 'John Smith',
        function: 'Manager'
    }
]

class AddProcessWizard extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            finished: false,
            stepIndex: 0,
            open: false,
            id: 0,
            process: {
                name: '',
                acronym: '',
                description: '',
                type: 1,
                help: '',
                status: 'parametrization',
                version: '1.0',
                notifySupervisorOnEnd: false,
                notifySupervisorOnError: false,
                AssignSupervisorOnError: false,
                blockProcessExecution: false,
                supervisorTeam: [{
                    name: 'John Smith',
                    function: 'Manager'
                }],
                step: [
                    {
                        order: '1',
                        type: 'PPO',
                        name: 'Get PPO customer data'
                    }
                ],
                tempStepName: '',
                tempStepType: 1
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (e) => {
        //console.log(e.target)
        let change = this.state
        change.process[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }
//Generalize selects per name
    handleSelectTypeChange = (event, index, value) => {
        let change = this.state
        change.process.type = value
        this.setState(change)
        console.log(this.state)
    }
//Generalize selects per name
    handleSelectTempStepTypeChange = (event, index, value) => {
        let change = this.state
        change.process.tempStepType = value
        this.setState(change)
        console.log(this.state)
    }

    WizardStepHandleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 4,
        })
    }

    WizardStepHandlePrev = () => {
        const {stepIndex} = this.state
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 })
        }
    }

    modalHandleOpen = () => {
        this.setState({ open: true })
    }

    modalHandleClose = () => {
        this.setState({ open: false })
        console.log('handleClose')
    }

    postProcess() {
        agent.post('http://localhost:3000/api/Processes')
            .send({
                id: 0,
                name: this.state.process.name,
                definition: this.state.process
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.error(err);
                } else {
                    console.log('yay got ' + JSON.stringify(res.body));
                }
            })
    }

    pushSupervisor() {
        tableDataSupervisorTeam.push({ userName: 'sss', function: 'fff' })
    }

    getStepContent(stepIndex) {
        const actionsStepModal = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.modalHandleClose}
                />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.modalHandleClose}
                />
        ]

        const actionsSupervisorModal = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.modalHandleClose}
                />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.pushSupervisor}
                />
        ]

        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <Paper zDepth={0} style={styles.paper}>
                            <TextField
                                id="name"
                                hintText="Insert Process Name"
                                floatingLabelText="Process Name"
                                value={this.state.process.name}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <TextField
                                id="acronym"
                                hintText="Insert Process Acronym"
                                floatingLabelText="Process Acronym"
                                value={this.state.process.acronym}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <TextField
                                id="description"
                                hintText="Insert Process Description"
                                floatingLabelText="Process Description"
                                value={this.state.process.description}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <SelectField
                                id="type"
                                style={styles.select}
                                floatingLabelText="Type"
                                value={this.state.process.type}
                                onChange={this.handleSelectTypeChange}
                                >
                                <MenuItem value={1} primaryText="Automated" />
                                <MenuItem value={2} primaryText="Sequential" />
                                <MenuItem value={3} primaryText="Case" />
                                <MenuItem value={4} primaryText="Check" />
                            </SelectField>
                            <br />
                        </Paper>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <Paper zDepth={0} style={styles.paper}>
                            <Table>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Order</TableHeaderColumn>
                                        <TableHeaderColumn>Type</TableHeaderColumn>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Action</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {this.state.process.step.map((row, index) => (
                                        <TableRow key={index} selected={row.selected}>
                                            <TableRowColumn>{row.order}</TableRowColumn>
                                            <TableRowColumn>{row.type}</TableRowColumn>
                                            <TableRowColumn>{row.name}</TableRowColumn>
                                            <TableRowColumn><FlatButton icon={iconDelete} href="/" /></TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <RaisedButton label="Add Step" onTouchTap={this.modalHandleOpen} fullWidth={true} />
                            <Dialog
                                title="Add a step"
                                actions={actionsStepModal}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.modalHandleClose}
                                >
                                <TextField
                                    id="tempStepName"
                                    hintText="Insert Step Name"
                                    floatingLabelText="Process Step Name"
                                    value={this.state.process.tempStepName}
                                    onChange={this.handleInputChange.bind(this)}
                                    />

                                <br />
                                <SelectField
                                    id="tempStepType"
                                    style={styles.select}
                                    floatingLabelText="Step type"
                                    value={this.state.process.tempStepType}
                                    onChange={this.handleSelectTempStepTypeChange}
                                    >
                                    <MenuItem value={1} primaryText="Type1" />
                                    <MenuItem value={2} primaryText="Type2" />
                                    <MenuItem value={3} primaryText="Type3" />
                                    <MenuItem value={4} primaryText="Type4" />
                                </SelectField>
                                <br />
                                <br />
                            </Dialog>
                            <br />
                            <br />
                        </Paper>
                    </div>
                )
            case 2:
                return (
                    <div style={styles.block}>
                        <Paper zDepth={0} style={styles.paper}>
                            <br />
                            <br />
                            <Checkbox
                                label="Notify Supervisor On Error"
                                style={styles.checkbox}
                                labelPosition="left"
                                defaultChecked={this.state.process.notifySupervisorOnError}
                                onChange={this.handleInputChange.bind(this, 'notifySupervisorOnError')}
                                />
                            <Checkbox
                                label="Notify Supervisor On End"
                                style={styles.checkbox}
                                labelPosition="left"
                                defaultChecked={this.state.process.notifySupervisorOnEnd}
                                onChange={this.handleInputChange.bind(this, 'notifySupervisorOnEnd')}
                                />
                            <Table>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Function</TableHeaderColumn>
                                        <TableHeaderColumn>Action</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {tableDataSupervisorTeam.map((row, index) => (
                                        <TableRow key={index} selected={row.selected}>
                                            <TableRowColumn>{row.name}</TableRowColumn>
                                            <TableRowColumn>{row.function}</TableRowColumn>
                                            <TableRowColumn><FlatButton icon={iconDelete} href="/" /></TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <RaisedButton label="Add Supervisor" onTouchTap={this.modalHandleOpen} fullWidth={true} />
                            <Dialog
                                title="Add Supervisor"
                                actions={actionsSupervisorModal}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.modalHandleClose}
                                >
                                <TextField
                                    hintText="Insert Supervisor Name"
                                    floatingLabelText="Supervisor Name"
                                    onChange={this.handleInputChange.bind(this, 'tempSupervisorName')}
                                    />
                                <br />
                                <TextField
                                    hintText="Insert Supervisor Function"
                                    floatingLabelText="Supervisor Function"
                                    onChange={this.handleInputChange.bind(this, 'tempSupervisorFunction')}
                                    />
                                <br />
                                <br />
                                <br />
                            </Dialog>
                            <br />
                            <br />
                        </Paper>
                    </div>
                )
            case 3:
                return (
                    <div style={styles.block}>
                        <Paper zDepth={0} style={styles.paper}>
                            <br />
                            <br />
                            <Checkbox
                                label="Assign to Supervisor On Error"
                                style={styles.checkbox}
                                labelPosition="left"
                                defaultChecked={this.state.process.AssignSupervisorOnError}
                                onChange={this.handleInputChange.bind(this, 'AssignSupervisorOnError')}
                                />
                            <Checkbox
                                label="Block Process Execution"
                                style={styles.checkbox}
                                labelPosition="left"
                                defaultChecked={this.state.process.blockProcessExecution}
                                onChange={this.handleInputChange.bind(this, 'blockProcessExecution')}
                                />
                            <br />
                            <br />
                        </Paper>
                    </div>
                )
            default:
                return 'Houston?'
        }
    }

    render() {
        const {finished, stepIndex} = this.state
        const contentStyle = { margin: '0 16px' }

        return (
            <MuiThemeProvider>
                <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
                    <br /><br /><br />
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Identification</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Flow</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Notification</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Exception Handling</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={contentStyle}>
                        {finished ? (
                            <p>
                                <Link to="#" onClick={(event) => {
                                    this.postProcess()
                                } }
                                    >
                                    Save</Link> the Process?
                            </p>
                        ) : (
                                <div>
                                    {this.getStepContent(stepIndex)}
                                    <div style={{ marginTop: 12 }}>
                                        <FlatButton
                                            label="Back"
                                            disabled={stepIndex === 0}
                                            onTouchTap={this.WizardStepHandlePrev}
                                            style={{ marginRight: 12 }}
                                            />
                                        <RaisedButton
                                            label={stepIndex === 4 ? 'Finish' : 'Next'}
                                            primary={true}
                                            onTouchTap={this.WizardStepHandleNext}
                                            />
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

}

export default AddProcessWizard;