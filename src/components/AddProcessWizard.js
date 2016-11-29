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
import Checkbox from 'material-ui/Checkbox'
import agent from 'superagent'
import Dialog from 'material-ui/Dialog'
import { browserHistory } from 'react-router'

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
                description: '',
                businessArea: '',
                type: '',
                help: '',
                status: 'parametrization',
                version: '1.0',
                notifySupervisorOnEnd: false,
                notifySupervisorOnError: false,
                AssignSupervisorOnError: false,
                blockProcessExecution: false,
                supervisorTeam: [],
                step: [],
                createdBy: 'Diogo Leite',
                tmpStepName: '',
                tmpStepType: 1,
                tmpSupervisorName: '',
                tmpSupervisorFunc: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
    }

    handleInputChange = (e) => {
        console.log(e.target)
        let change = this.state
        change.process[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleCheckChange = (e) => {
        console.log(e.target)
        let change = this.state
        if (change.process[e.target.id] === false)
            change.process[e.target.id] = true
        else
            change.process[e.target.id] = false
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
    handleSelectBAChange = (event, index, value) => {
        let change = this.state
        change.process.businessArea = value
        this.setState(change)
        console.log(this.state)
    }

    //Generalize selects per name
    handleSelectTempStepTypeChange = (event, index, value) => {
        let change = this.state
        change.process.tmpStepType = value
        this.setState(change)
        console.log(this.state)
    }

    handleNextWizard = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
        })
    }

    handlePrevWizard = () => {
        const {stepIndex} = this.state
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 })
        }
    }

    handleFinishWizard = () => {
        this.postProcess()
        browserHistory.push('/')
    }

    handleOpenModal = () => {
        this.setState({ open: true })
    }

    handleCloseModal = () => {
        this.setState({ open: false })
    }

    handleSaveStepModal = () => {
        //get max order from array step
        let orderArray = this.state.process.step.map(function(step) {
            return step.order
        })
        let maxOrder = 0
        if (orderArray.length !== 0)
            maxOrder = Math.max.apply(null, orderArray)
        //set state to close modal
        this.setState({ open: false })
        //set state to push step
        let change = this.state
        let stepToPush = {
            order: maxOrder + 1,
            type: this.state.process.tmpStepType,
            name: this.state.process.tmpStepName
        }
        change.process.step.push(stepToPush)
        //reset tmps 
        change.process.tmpStepName = ''
        change.process.tmpStepType = 1
    }

    handleSaveSupervisorModal = () => {
        //set state to close modal
        this.setState({ open: false })
        //set state to push step
        let change = this.state
        let supervisorToPush = {
            name: this.state.process.tmpSupervisorName,
            description: this.state.process.tmpSupervisorFunc
        }
        change.process.supervisorTeam.push(supervisorToPush)
        //reset tmps 
        change.process.tmpSupervisorName = ''
        change.process.tmpSupervisorName = 1
    }

    postProcess() {
        console.log('posting process!')
        agent.post('http://localhost:3000/api/Processes')
            .send({
                name: this.state.process.name,
                definition: this.state.process
            })
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err || !res.ok) {
                    console.error(err);
                } else {
                    console.log('yay! process posted ' + JSON.stringify(res.body));
                }
            })
    }

    getStepContent(stepIndex) {
        const actionsStepModal = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseModal}
                />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveStepModal}
                />
        ]

        const actionsSupervisorModal = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseModal}
                />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSaveSupervisorModal}
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
                                id="description"
                                hintText="Insert Process Description"
                                floatingLabelText="Process Description"
                                value={this.state.process.description}
                                onChange={this.handleInputChange.bind(this)}
                                multiLine={true}
                                rows={2}
                                />
                            <br />
                            <SelectField
                                id="businessArea"
                                style={styles.select}
                                floatingLabelText="Business Area"
                                value={this.state.process.businessArea}
                                onChange={this.handleSelectBAChange}
                                >
                                <MenuItem value={'Mortgage'} primaryText="Mortgage" />
                                <MenuItem value={'Human Resources'} primaryText="Human Resources" />
                                <MenuItem value={'Risk & Compliance'} primaryText="Risk & Compliance" />
                                <MenuItem value={'Operations & Execution'} primaryText="Operations & Execution" />
                                <MenuItem value={'Marketing'} primaryText="Marketing" />
                                <MenuItem value={'Sales & Service'} primaryText="Sales & Service" />
                                <MenuItem value={'IT Management'} primaryText="IT Management" />
                                <MenuItem value={'Loans'} primaryText="Loans" />
                            </SelectField>
                            <SelectField
                                id="type"
                                style={styles.select}
                                floatingLabelText="Type"
                                value={this.state.process.type}
                                onChange={this.handleSelectTypeChange}
                                >
                                <MenuItem value={'Automated'} primaryText="Automated" />
                                <MenuItem value={'Sequential'} primaryText="Sequential" />
                                <MenuItem value={'Case'} primaryText="Case" />
                                <MenuItem value={'Check'} primaryText="Check" />
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
                            <RaisedButton label="Add Step" onTouchTap={this.handleOpenModal} fullWidth={true} />
                            <Dialog
                                title="Add a step"
                                actions={actionsStepModal}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleCloseModal}
                                >
                                <TextField
                                    id="tmpStepName"
                                    hintText="Insert Step Name"
                                    floatingLabelText="Process Step Name"
                                    value={this.state.process.tmpStepName}
                                    onChange={this.handleInputChange.bind(this)}
                                    />

                                <br />
                                <SelectField
                                    id="tmpStepType"
                                    style={styles.select}
                                    floatingLabelText="Step type"
                                    value={this.state.process.tmpStepType}
                                    onChange={this.handleSelectTempStepTypeChange}
                                    >
                                    <MenuItem value={'Type1'} primaryText="Type1" />
                                    <MenuItem value={'Type2'} primaryText="Type2" />
                                    <MenuItem value={'Type3'} primaryText="Type3" />
                                    <MenuItem value={'Type4'} primaryText="Type4" />
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
                            <Table>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Function</TableHeaderColumn>
                                        <TableHeaderColumn>Action</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {this.state.process.supervisorTeam.map((row, index) => (
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
                                actions={actionsSupervisorModal}
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
                )
            case 3:
                return (
                    <div style={styles.block}>
                        <Paper zDepth={0} style={styles.paper}>
                            <br />
                            <br />
                            <Checkbox
                                id="notifySupervisorOnError"
                                label="Notify Supervisor on Error"
                                style={styles.checkbox}
                                checked={this.state.process.notifySupervisorOnError}
                                onCheck={this.handleCheckChange.bind(this)}
                                />
                            <Checkbox
                                id="notifySupervisorOnEnd"
                                label="Notify Supervisor On End"
                                style={styles.checkbox}
                                checked={this.state.process.notifySupervisorOnEnd}
                                onCheck={this.handleCheckChange.bind(this)}
                                />

                            <Checkbox
                                id="AssignSupervisorOnError"
                                label="Assign to Supervisor On Error"
                                style={styles.checkbox}
                                checked={this.state.process.AssignSupervisorOnError}
                                onCheck={this.handleCheckChange.bind(this)}
                                />
                            <Checkbox
                                id="blockProcessExecution"
                                label="Block Process Execution"
                                style={styles.checkbox}
                                checked={this.state.process.blockProcessExecution}
                                onCheck={this.handleCheckChange.bind(this)}
                                />
                            <br />
                            <br />
                        </Paper>
                    </div>
                )
            default:
                return 'Houston? Wizard has gone to default case.'
        }
    }

    render() {
        const {stepIndex} = this.state
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
                            <StepLabel>Sequence</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Supervision</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Exception Handling</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={contentStyle}>
                        <div>
                            {this.getStepContent(stepIndex)}
                            <div style={{ marginTop: 12 }}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrevWizard}
                                    style={{ marginRight: 12 }}
                                    />
                                <RaisedButton
                                    label={stepIndex === 3 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={stepIndex === 3 ? this.handleFinishWizard : this.handleNextWizard}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

}

export default AddProcessWizard