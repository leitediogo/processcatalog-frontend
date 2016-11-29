import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Supervisor from 'material-ui/svg-icons/action/supervisor-account'
import Gavel from 'material-ui/svg-icons/action/gavel'
import Business from 'material-ui/svg-icons/communication/business'
import LocalATM from 'material-ui/svg-icons/maps/local-atm'
import InsertChart from 'material-ui/svg-icons/editor/insert-chart'
import AttachMoney from 'material-ui/svg-icons/editor/attach-money'
import Extension from 'material-ui/svg-icons/action/extension'
import Class from 'material-ui/svg-icons/action/class'
import Accountbalance from 'material-ui/svg-icons/action/account-balance'

class ProcessCatalogAppBarLeftIconMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <IconButton onTouchTap={this.handleToggle}>
                        <MenuIcon color='white' />
                    </IconButton>
                    <Drawer
                        docked={false}
                        width={300}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({ open })}>
                        <List>
                            <Subheader>Process Catalog</Subheader>
                            <ListItem primaryText="Mortgage" leftIcon={<Business />} />
                            <ListItem primaryText="Human Resources" leftIcon={<Supervisor />} />
                            <ListItem primaryText=" Risk & Compliance" leftIcon={<Gavel />} />
                            <ListItem primaryText="Payments & Cards" leftIcon={<LocalATM />} />
                            <ListItem primaryText="Operations & Execution" leftIcon={<Accountbalance />} />
                            <ListItem primaryText="Marketing" leftIcon={<InsertChart />} />
                            <ListItem primaryText="Sales & Service" leftIcon={<AttachMoney />} />
                            <ListItem primaryText="IT Management" leftIcon={<Extension />} />
                            <ListItem primaryText="Loans" leftIcon={<Class />} />
                        </List>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ProcessCatalogAppBarLeftIconMenu