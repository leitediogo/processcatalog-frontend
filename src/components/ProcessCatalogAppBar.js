import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ProcessCatalogAppBarRightIconMenu from './ProcessCatalogAppBarRightIconMenu'
import ProcessCatalogAppBarLeftIconMenu from './ProcessCatalogAppBarLeftIconMenu'
import {browserHistory} from 'react-router'

const styles = {
  title: {
    cursor: 'pointer'
  }
}

class ProcessCatalogAppBar extends Component {

    handleAppBarClick(){
        console.log('handleAppBarClick')
         browserHistory.push('/')
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title={<span style={styles.title}>Process Catalog</span>}
                        onTitleTouchTap={this.handleAppBarClick}
                        iconElementRight={<ProcessCatalogAppBarRightIconMenu />}
                        iconElementLeft={<ProcessCatalogAppBarLeftIconMenu 
                        filterProcesses={this.props.filterProcesses}
                        />}
                        />
                  </div>
            </MuiThemeProvider>
        )
    }
}

export default ProcessCatalogAppBar