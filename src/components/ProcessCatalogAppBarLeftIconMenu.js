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
import Accessibility from 'material-ui/svg-icons/action/accessibility'



class ProcessCatalogAppBarLeftIconMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });


    handleClickBusinessArea(businessArea){
        this.props.filterProcesses(businessArea)
        this.setState({ open: false })
    }

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
                            <Subheader>Business Areas</Subheader>
                            <ListItem primaryText="Mortgage" leftIcon={<Business />} onClick={() => this.handleClickBusinessArea('Mortgage')} />
                            <ListItem primaryText="Human Resources" leftIcon={<Supervisor />} onClick={() => this.handleClickBusinessArea('Human Resources')}/>
                            <ListItem primaryText=" Risk and Compliance" leftIcon={<Gavel />} onClick={() => this.handleClickBusinessArea('Risk and Compliance')}/>
                            <ListItem primaryText="Payments and Cards" leftIcon={<LocalATM />} onClick={() => this.handleClickBusinessArea('Payments and Cards')}/>
                            <ListItem primaryText="Operations and Execution" leftIcon={<Accountbalance />} onClick={() => this.handleClickBusinessArea('Operations and Execution')}/>
                            <ListItem primaryText="Marketing" leftIcon={<InsertChart />} onClick={() => this.handleClickBusinessArea('Marketing')}/>
                            <ListItem primaryText="Sales and Service" leftIcon={<AttachMoney />} onClick={() => this.handleClickBusinessArea('Sales and Service')}/>
                            <ListItem primaryText="IT Management" leftIcon={<Extension/>} onClick={() => this.handleClickBusinessArea('IT Management')} />
                            <ListItem primaryText="Loans" leftIcon={<Class />} onClick={() => this.handleClickBusinessArea('Loans')}/>
                            <ListItem primaryText="All" leftIcon={<Accessibility />} onClick={() => this.handleClickBusinessArea('All')}/>
                        </List>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ProcessCatalogAppBarLeftIconMenu