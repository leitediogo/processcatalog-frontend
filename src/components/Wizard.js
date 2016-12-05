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

class Wizard extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            finished: false,
            stepIndex: 0,
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
                flow: [],
                createdBy: 'Diogo Leite',
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

    handleNextWizard = () => {
        const {stepIndex} = this.state
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

    handleSaveFlow(name, type) {
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
            name: name
        }
        change.definition.flow.push(stepToPush)
        this.setState(change)
    }


    handleSaveSupervisor(name, func) {
        console.log('handleSaveSupervisor: ', name)
        console.log('handleSaveSupervisor: ', func)

        //set state
        let change = this.state
        let supervisorToPush = {
            function: func,
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
            default:
                return 'Houston? Wizard has gone to default case.'
        }
    }

    render() {
        const {stepIndex} = this.state

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
                                    label={stepIndex === 3 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={stepIndex === 3 ? this.handleFinishWizard : this.handleNextWizard}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Wizard;