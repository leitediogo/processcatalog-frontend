import React, { Component } from 'react'
import Toolbar from 'material-ui/Toolbar'
import NBFooter from '../images/logo-maker-white.png'

const styles = {
    barStyle: {
        position: "fixed",
        bottom: "0px",
        width: "100%",
        background: "#455A64",
        height: 40
    },
    imgStyle: {
        width: 40,
        height: 40,
        position: 'absolute',
        //top: this.props.top, 
        right: '0px'
    }
}

class ProcessCatalogBottomNavigation extends Component {
    render() {
        return (
            <div>
                <Toolbar style={styles.barStyle}>
                    <img src={NBFooter} alt="boohoo" style={styles.imgStyle} />
                </Toolbar>
            </div>
        )
    }
}

export default ProcessCatalogBottomNavigation