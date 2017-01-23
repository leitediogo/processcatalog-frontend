import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import agent from 'superagent'
import ProcessCatalogAppBar from './ProcessCatalogAppBar'
import ProcessCatalogCardList from './ProcessCatalogCardList'
import ProcessCatalogBottomNavigation from './ProcessCatalogBottomNavigation'
import Wizard from './Wizard'
import IconTesting from './IconTesting'
import EditProfile from './EditProfile'
import { requireAuth } from '../auth'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT

class App extends Component {

    constructor() {
        super()
        this.state = {
            filteredProcesses: [],
            allProcesses: []
        }
    }

    componentDidMount() {
        agent.get('http://' + api_server_name + ':' + api_server_port + '/api/Processes')
            .then(function (res) {
                this.setState({ allProcesses: res.body })
                this.setState({ filteredProcesses: res.body })
                console.log(this.state)
            }.bind(this));
    }

    filterProcesses(filter) {
        console.log('Process Filter: ', filter)
        if (filter !== "All") {
            this.setState({
                filteredProcesses: this.state.allProcesses.filter(function (process) {
                    return process.definition.businessArea === filter
                })
            })
        } else {
            console.log('all')
            this.setState({
                filteredProcesses: this.state.allProcesses.filter(function (process) {
                    return process
                })
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <ProcessCatalogAppBar filterProcesses={this.filterProcesses.bind(this)} />
                    <Router history={browserHistory}>
                        <Route path="/" component={() => (<ProcessCatalogCardList processes={this.state.filteredProcesses} />)} />
                        {/* Testing Routes */}
                        <Route path="/icons" component={IconTesting} />
                        {/* End Testing Routes */}
                        <Route onEnter={requireAuth}>
                            {/* Place all authenticated routes here */}
                            <Route path="/profile/edit" component={EditProfile} />
                            <Route path="/addProcess" component={Wizard} />
                        </Route>
                    </Router>
                    <ProcessCatalogBottomNavigation />
                </div>
            </div>
        )
    }
}

export default App

