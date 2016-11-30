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
import { List, ListItem } from 'material-ui/List';

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
            definition: {
                name: '',
                description: '',
                businessArea: '',
                type: '',
                help: '',
                status: 'Parametrization',
                version: '1.0',
                notifySupervisorOnEnd: false,
                notifySupervisorOnError: false,
                AssignSupervisorOnError: false,
                blockProcessExecution: false,
                supervisorTeam: [],
                step: [],
                createdBy: 'Diogo Leite',
                tmpStepName: '',
                tmpStepType: '',
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
        change.definition[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleCheckChange = (e) => {
        console.log(e.target)
        let change = this.state
        if (change.definition[e.target.id] === false)
            change.definition[e.target.id] = true
        else
            change.definition[e.target.id] = false
        this.setState(change)
        console.log(this.state)
    }

    //Generalize selects per name
    handleSelectTypeChange = (event, index, value) => {
        let change = this.state
        change.definition.type = value
        this.setState(change)
        console.log(this.state)
    }

    //Generalize selects per name
    handleSelectBAChange = (event, index, value) => {
        let change = this.state
        change.definition.businessArea = value
        this.setState(change)
        console.log(this.state)
    }

    //Generalize selects per name
    handleSelectTempStepTypeChange = (event, index, value) => {
        let change = this.state
        change.definition.tmpStepType = value
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
        let orderArray = this.state.definition.step.map(function (step) {
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
            type: this.state.definition.tmpStepType,
            name: this.state.definition.tmpStepName
        }
        change.definition.step.push(stepToPush)
        //reset tmps 
        change.definition.tmpStepName = ''
        change.definition.tmpStepType = 1
    }

    handleSaveSupervisorModal = () => {
        //set state to close modal
        this.setState({ open: false })
        //set state to push step
        let change = this.state
        let supervisorToPush = {
            name: this.state.definition.tmpSupervisorName,
            function: this.state.definition.tmpSupervisorFunc
        }
        console.log(supervisorToPush)
        change.definition.supervisorTeam.push(supervisorToPush)
        //reset tmps 
        change.definition.tmpSupervisorName = ''
        change.definition.tmpSupervisorFunc = ''
    }

    postProcess() {
        console.log('posting process!')
        let change = this.state
        change.definition.version = '1.0'
        change.definition.status = 'Certification'
        this.setState(change)
        
        agent.post('http://localhost:3000/api/Processes')
            .send({
                name: this.state.definition.name,
                definition: this.state.definition
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
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
                                value={this.state.definition.name}
                                onChange={this.handleInputChange.bind(this)}
                                />
                            <br />
                            <TextField
                                id="description"
                                hintText="Insert Process Description"
                                floatingLabelText="Process Description"
                                value={this.state.definition.description}
                                onChange={this.handleInputChange.bind(this)}
                                multiLine={true}
                                rows={2}
                                />
                            <br />
                            <SelectField
                                id="businessArea"
                                style={styles.select}
                                floatingLabelText="Business Area"
                                value={this.state.definition.businessArea}
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
                                value={this.state.definition.type}
                                onChange={this.handleSelectTypeChange}
                                >
                                <MenuItem value={'RPA'} primaryText="RPA" />
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
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Type</TableHeaderColumn>
                                        <TableHeaderColumn>Action</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {this.state.definition.step.map((row, index) => (
                                        <TableRow key={index} selected={row.selected}>
                                            <TableRowColumn>{row.order}</TableRowColumn>
                                            <TableRowColumn>{row.name}</TableRowColumn>
                                            <TableRowColumn>{row.type}</TableRowColumn>
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
                                    value={this.state.definition.tmpStepName}
                                    onChange={this.handleInputChange.bind(this)}
                                    />

                                <br />
                                <SelectField
                                    id="tmpStepType"
                                    style={styles.select}
                                    floatingLabelText="Step type"
                                    value={this.state.definition.tmpStepType}
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
                                    {this.state.definition.supervisorTeam.map((row, index) => (
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

                            <List>
                                <ListItem
                                    leftCheckbox={<Checkbox
                                        id="notifySupervisorOnError"
                                        style={styles.checkbox}
                                        checked={this.state.definition.notifySupervisorOnError}
                                        onCheck={this.handleCheckChange.bind(this)}
                                        />}
                                    primaryText="Notify Supervisor on Error"
                                    secondaryText="When an error occurs supervisors will be notified via email"
                                    />
                                <ListItem
                                    leftCheckbox={<Checkbox
                                        id="notifySupervisorOnEnd"
                                        style={styles.checkbox}
                                        checked={this.state.definition.notifySupervisorOnEnd}
                                        onCheck={this.handleCheckChange.bind(this)}
                                        />}
                                    primaryText="Notify Supervisor On End"
                                    secondaryText="When process ends execution supervisors will be notified via email"
                                    />
                                <ListItem
                                    leftCheckbox={<Checkbox
                                        id="AssignSupervisorOnError"
                                        style={styles.checkbox}
                                        checked={this.state.definition.AssignSupervisorOnError}
                                        onCheck={this.handleCheckChange.bind(this)}
                                        />}
                                    primaryText="Assign to Supervisor On Error"
                                    secondaryText="When an error occurs a task will be delivered to the supervisors"
                                    />
                                <ListItem
                                    leftCheckbox={<Checkbox
                                        id="blockProcessExecution"
                                        style={styles.checkbox}
                                        checked={this.state.definition.blockProcessExecution}
                                        onCheck={this.handleCheckChange.bind(this)}
                                        />}
                                    primaryText="Block Process Execution"
                                    secondaryText="When an error occurs the process stops executing"
                                    />
                            </List>
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