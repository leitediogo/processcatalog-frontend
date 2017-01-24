
import React, { Component } from 'react';
import agent from 'superagent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { browserHistory } from 'react-router'

import WizardIdentification from './WizardIdentification'
import WizardFlow from './WizardFlow'
import WizardSupervisor from './WizardSupervisor'
import WizardNotifications from './WizardNotifications'
import WizardScheduler from './WizardScheduler'
import { connectProfile } from '../auth'

const api_server_name=process.env.REACT_APP_API_SERVER_NAME
const api_server_port=process.env.REACT_APP_API_SERVER_PORT

class Wizard extends Component {

    constructor(props, context) {
        super(props, context)
        const {profile} = this.props
        this.state = {
            finished: false,
            stepIndex: 0,
            definition: {
                name: '',
                description: '',
                businessArea: '',
                type: '',
                help: '',
                status: 'Parametrization', //Initial status
                version: '1.0', //Initial version
                notifySupervisorOnEnd: false,
                notifySupervisorOnError: false,
                AssignSupervisorOnError: false,
                blockProcessExecution: false,
                scheduleType:'',
                supervisorTeam: [],
                flow: [],
                createdBy: profile.name,
                createdByAvatar: profile.picture
            }
        }
    }

    handleDefinitionInputChange = (e) => {
        let change = this.state
        change.definition[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleCheckChange = (e) => {
        let change = this.state
        if (change.definition[e.target.id] === false)
            change.definition[e.target.id] = true
        else
            change.definition[e.target.id] = false
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleDefinitionTypeChange = (event, index, value) => {
        let change = this.state
        change.definition.type = value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleDefinitionBusinessAreaChange = (event, index, value) => {
        let change = this.state
        change.definition.businessArea = value
        this.setState(change)
        console.log(this.state)
    }

        //TODO: Generalize selects per name
    handleDefinitionScheduleTypeChange = (event, index, value) => {
        let change = this.state
        change.definition.scheduleType = value
        this.setState(change)
        console.log(this.state)
    }

    handleNextWizard = () => {
        const {stepIndex} = this.state
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 4,
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
        window.location.reload()
    }

    handleSaveFlow(name, type, cutoff1, cutoff2) {
        //get max order from array flow
        let orderArray = this.state.definition.flow.map(function (flow) {
            return flow.order
        })
        let maxOrder = 0
        if (orderArray.length !== 0)
            maxOrder = Math.max.apply(null, orderArray)
        //set state
        let change = this.state
        let stepToPush = {
            order: maxOrder + 1,
            type: type,
            name: name,
            cutoff1: cutoff1,
            cutoff2: cutoff2
        }
        change.definition.flow.push(stepToPush)
        this.setState(change)
    }


    handleSaveSupervisor(name, func) {
        let change = this.state
        let supervisorToPush = {
            funtion: func,
            name: name
        }
        change.definition.supervisorTeam.push(supervisorToPush)
        this.setState(change)
    }

    postProcess() {
        console.log('posting process!')
        let change = this.state
        change.definition.version = '1.0'
        change.definition.status = 'Certification'
        this.setState(change)
        agent.post('http://'+ api_server_name + ':' + api_server_port + '/api/Processes')
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
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <WizardIdentification
                            definition={this.state.definition}
                            handleDefinitionInputChange={this.handleDefinitionInputChange.bind(this)}
                            handleDefinitionBusinessAreaChange={this.handleDefinitionBusinessAreaChange.bind(this)}
                            handleDefinitionTypeChange={this.handleDefinitionTypeChange.bind(this)}
                            />
                    </div>
                )
            case 1:
                return (
                    <div>
                        <WizardFlow
                            definition={this.state.definition}
                            handleSaveFlow={this.handleSaveFlow.bind(this)}
                            />
                    </div>
                )
            case 2:
                return (
                    <div>
                        <WizardSupervisor
                            definition={this.state.definition}
                            handleSaveSupervisor={this.handleSaveSupervisor.bind(this)}
                            />
                    </div>
                )
            case 3:
                return (
                    <div>
                        <WizardNotifications
                            definition={this.state.definition}
                            handleCheckChange={this.handleCheckChange.bind(this)}
                            />
                    </div>
                )
            case 4:
                return (
                    <div>
                        <WizardScheduler
                            definition={this.state.definition}
                            handleDefinitionScheduleTypeChange={this.handleDefinitionScheduleTypeChange.bind(this)}
                            />
                    </div>
                )
            default:
                return 'Houston? Wizard has gone to default case.'
        }
    }

    render() {
        const {stepIndex} = this.state
        return (
            <MuiThemeProvider>
                <div style={{ width: '100%', maxWidth: 700, margin: 'auto'}} >
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
                        <Step>
                            <StepLabel>Trigger</StepLabel>
                        </Step>
                    </Stepper>
                    <div>
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
                                    label={stepIndex === 4 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={stepIndex === 4 ? this.handleFinishWizard : this.handleNextWizard}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connectProfile(Wizard)