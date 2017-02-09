import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
//import {darken, fade, emphasize, lighten} from 'material-ui/utils/colorManipulator'
import { Router, Route, browserHistory } from 'react-router'
import agent from 'superagent'
import ProcessCatalogAppBar from './ProcessCatalogAppBar'
import ProcessCatalogCardList from './ProcessCatalogCardList'
import ProcessCatalogBottomNavigation from './ProcessCatalogBottomNavigation'
import ProcessCatalogEdit from './ProcessCatalogEdit'
import Wizard from './Wizard'
import TestIcons from './TestIcons'
import EditProfile from './EditProfile'
import { requireAuth } from '../auth'

import Accessibility from 'material-ui/svg-icons/action/accessibility'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT
let business_area_filter = 'All' //filtered by on screen
let business_area_icon_component = <Accessibility />

//pallete layout definition below
const muiTheme = getMuiTheme({
    //spacing: '200',
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#455A64',
        //primary2Color: 'green',
        //primary3Color: 'green',
        //accent1Color: 'green',
        //accent2Color: 'green',
        //accent3Color: 'green',
        //textColor: 'white',
        //alternateTextColor: 'white',
        canvasColor: 'white',
        borderColor: '#0097A7',
        //disabledColor: 'green',
        //pickerHeaderColor: 'green',
        //clockCircleColor: fade('green', 0.07),
        shadowColor: 'green',
    },
    appBar: {
        height: 50,
    },
    bottomNavigation: {
        backgroundColor: '#455A64',
        unselectedColor: '#0097A7',
        selectedColor: 'white',
        height: 50,
        unselectedFontSize: 12,
        selectedFontSize: 14,
    },
})

class App extends Component {

    constructor() {
        super()
        this.state = {
            filteredProcesses: [],
            allProcesses: []
        }
        this.filterProcesses = this.filterProcesses.bind(this)
    }

    componentDidMount() {
        agent.get('http://' + api_server_name + ':' + api_server_port + '/api/Processes')
            .then(function (res) {
                this.setState({ allProcesses: res.body })
                this.setState({ filteredProcesses: res.body })
                console.log(this.state)
            }.bind(this));
    }

    filterProcesses(filter, iconComponent) {
        console.log('Process Filter: ', filter)
        console.log('Process Icon: ', iconComponent)
        business_area_filter = filter //set filtered by on screen
        business_area_icon_component = iconComponent
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
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <ProcessCatalogAppBar filterProcesses={this.filterProcesses} />
                    {/*business_area_icon_component*/}
                    <Router history={browserHistory}>
                        <Route path="/" component={() => (<ProcessCatalogCardList processes={this.state.filteredProcesses} />)} />
                        {/* Testing Routes */}
                        <Route path="/icons" component={TestIcons} />
                        {/* End Testing Routes */}
                        <Route onEnter={requireAuth}>
                            {/* Place all authenticated routes here */}
                            <Route path="/addProcess" component={Wizard} />
                            <Route path="/editProcess" component={ProcessCatalogEdit} />
                            <Route path="/profile/edit" component={EditProfile} />
                        </Route>
                    </Router>
                    <ProcessCatalogBottomNavigation />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App

