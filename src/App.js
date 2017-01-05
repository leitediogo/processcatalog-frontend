import React, { Component } from 'react'
import './App.css'
import { Router, Route, browserHistory } from 'react-router'
import agent from 'superagent'
import ProcessCatalogAppBar from './components/ProcessCatalogAppBar'
import ProcessCatalogCardList from './components/ProcessCatalogCardList'
import ProcessCatalogBottomNavigation from './components/ProcessCatalogBottomNavigation'
import Wizard from './components/Wizard'
import IconTesting from './components/IconTesting'
import WizardScheduler from './components/WizardScheduler'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {

    constructor() {
        super()
        this.state = {
            filteredProcesses: [],
            allProcesses: []
        }
    }

    componentDidMount() {
        agent.get('http://localhost:3000/api/Processes')
            .then(function(res) {
                this.setState({ allProcesses: res.body })
                this.setState({ filteredProcesses: res.body })
                console.log(this.state)
            }.bind(this));
    }

    filterProcesses(filter) {
        console.log('Process Filter: ', filter)
        if (filter !== "All") {
            this.setState({
                filteredProcesses: this.state.allProcesses.filter(function(process) {
                    return process.definition.businessArea === filter
                })
            })
        } else {
            console.log('all')
            this.setState({
                filteredProcesses: this.state.allProcesses.filter(function(process) {
                    return process
                })
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <ProcessCatalogAppBar filterProcesses={this.filterProcesses.bind(this)}/>
                    <Router history={browserHistory}>
                        <Route path="/" component={() => (<ProcessCatalogCardList processes={this.state.filteredProcesses} />)} />
                        <Route path="/addProcess" component={Wizard} />
                        <Route path="/icons" component={IconTesting} />
                        <Route path="/scheduler" component={WizardScheduler} />
                    </Router>
                    <ProcessCatalogBottomNavigation />
                </div>
            </div>
        )
    }
}

export default App

