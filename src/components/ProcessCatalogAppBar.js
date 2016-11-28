import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ProcessCatalogAppBarRightIconMenu from './ProcessCatalogAppBarRightIconMenu'
import ProcessCatalogAppBarLeftIconMenu from './ProcessCatalogAppBarLeftIconMenu'

let style ={
    position: "fixed",
    top: "0px",
    width: "100%"
}

class ProcessCatalogAppBar extends Component {
    constructor() {
        super()
        this.state = { ProcessCatalog: '', ProcessCatalogList: [] }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        style={style}
                        title="Catalog"
                        iconElementRight={<ProcessCatalogAppBarRightIconMenu />}
                        iconElementLeft={<ProcessCatalogAppBarLeftIconMenu />}
                        />
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ProcessCatalogAppBar