import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import ProcessCatalogAppBarRightIconMenu from './ProcessCatalogAppBarRightIconMenu'
import ProcessCatalogAppBarLeftIconMenu from './ProcessCatalogAppBarLeftIconMenu'
import { browserHistory } from 'react-router'
import { connectProfile } from '../auth'
import FlatButton from 'material-ui/FlatButton'
import { login } from '../auth'

const styles = {
    title: {
        cursor: 'pointer'
    },
    login: {
        backgroundColor: "#0097A7"
    }
}

class ProcessCatalogAppBar extends Component {

    handleAppBarClick() {
        console.log('handleAppBarClick')
        browserHistory.push('/')
    }

    render() {
        const {profile} = this.props
        return (
            <div>
                <AppBar
                    title={<span style={styles.title}>Process Catalog</span>}
                    style={styles.bar}
                    onTitleTouchTap={this.handleAppBarClick}
                    iconElementRight={(profile) ? <ProcessCatalogAppBarRightIconMenu /> : <FlatButton label="Login" onClick={() => { login() }} style={styles.login} />}
                    iconElementLeft={<ProcessCatalogAppBarLeftIconMenu filterProcesses={this.props.filterProcesses} />}
                />
            </div>
        )
    }
}

export default connectProfile(ProcessCatalogAppBar)