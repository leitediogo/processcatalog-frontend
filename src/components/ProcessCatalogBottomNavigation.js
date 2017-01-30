import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import IconFavorites from 'material-ui/svg-icons/action/favorite'
import IconRecents from 'material-ui/svg-icons/navigation/refresh'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

const styles = {
    bottomStyle: {
        position: "fixed",
        bottom: "0px",
        width: "100%",
        //backgroundColor: 'black',
    }
}

const recentsIcon = <IconRecents style={styles.iconStyle} />
const favoritesIcon = <IconFavorites />
const myProcessesIcon = <AccountCircle />

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'black',
  }
});


class ProcessCatalogBottomNavigation extends Component {
    state = {
        selectedIndex: 0,
    }

    select = (index) => {
        this.setState({ selectedIndex: index })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <BottomNavigation style={styles.bottomStyle} selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Recents"
                        icon={recentsIcon}
                        onTouchTap={() => this.select(0)}
                        />
                    <BottomNavigationItem
                        label="Favorites"
                        icon={favoritesIcon}
                        onTouchTap={() => this.select(1)}
                        />
                    <BottomNavigationItem
                        label="My Processes"
                        icon={myProcessesIcon}
                        onTouchTap={() => this.select(2)}
                        />
                </BottomNavigation>
            </MuiThemeProvider>
        )
    }
}


export default ProcessCatalogBottomNavigation