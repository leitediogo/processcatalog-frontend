import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import ActionGrade from 'material-ui/svg-icons/action/grade';

class ProcessCatalogAppBarLeftIconMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
 //iconButtonElement={<IconButton><MenuIcon color='red' /></IconButton>}

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <IconButton onTouchTap={this.handleToggle}>
                        <MenuIcon color='white' />
                    </IconButton>
                      <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({ open })}>
                    <List>
                        <Subheader>Process Catalog</Subheader>
                        <ListItem primaryText="Compliance" leftIcon={<ContentSend />} />
                        <ListItem primaryText="HR" leftIcon={<ContentDrafts />} />
                        <ListItem
                        primaryText="Operations"
                        leftIcon={<ContentInbox />}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                            key={1}
                            primaryText="Insolvency"
                            leftIcon={<ActionGrade />}
                            />,
                            <ListItem
                            key={2}
                            primaryText="Account Opening"
                            leftIcon={<ContentSend />}
                            disabled={true}
                            nestedItems={[
                                <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                            ]}
                            />,
                            <ListItem
                            key={3}
                            primaryText="Inbox"
                            leftIcon={<ContentInbox />}
                            open={this.state.open}
                            onNestedListToggle={this.handleNestedListToggle}
                            nestedItems={[
                                <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                            ]}
                            />,
                        ]}
                        />
                    </List>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ProcessCatalogAppBarLeftIconMenu