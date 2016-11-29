import React, { Component } from 'react'
import './App.css'
import { Router, Route, browserHistory } from 'react-router'
import ProcessCatalogAppBar from './components/ProcessCatalogAppBar'
import ProcessCatalogCardList from './components/ProcessCatalogCardList'
import ProcessCatalogBottomNavigation from './components/ProcessCatalogBottomNavigation'
import AddProcessWizard from './components/AddProcessWizard'
import IconTesting from './components/IconTesting'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <ProcessCatalogAppBar />
                </div>
                <Router history={browserHistory}>
                    <Route path="/" component={ProcessCatalogCardList} />
                    <Route path="/addProcess" component={AddProcessWizard} />
                    <Route path="/icons" component={IconTesting} />
                </Router>
                <div>
                    <ProcessCatalogBottomNavigation />
                </div>
            </div>
        );
    }
}

export default App;

