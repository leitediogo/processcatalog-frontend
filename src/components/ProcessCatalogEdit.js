
import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import { Tabs, Tab } from 'material-ui/Tabs'
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'gray',
    }
})

const styles = {
    paper: {
        margin: 20,
        textAlign: 'left',
        display: 'inline-block',
        width: 800,
        height: 300
    },
    select: {
        align: 'left'
    },
    tab: {
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        slide: {
            padding: 10,
        }
    }
}

class ProcessCatalogEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        }
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <div>
                            <Tabs
                                onChange={this.handleChange}
                                value={this.state.slideIndex}
                                >
                                <Tab label="Identification" value={0} />
                                <Tab label="Flow & Supervision" value={1} />
                                <Tab label="Notification & Scheduling" value={2} />
                            </Tabs>
                            <SwipeableViews
                                index={this.state.slideIndex}
                                onChangeIndex={this.handleChange}
                                >
                                <div>
                                    <Paper zDepth={0} style={styles.paper}>
                                        <TextField
                                            id="name"
                                            hintText="Insert Process Name"
                                            floatingLabelText="Process Name"
                                            value={this.props.location.state.process.name}
                                            //onChange={this.props.handleInputChange}
                                            />
                                        <br />
                                        <TextField
                                            id="description"
                                            hintText="Insert Process Description"
                                            floatingLabelText="Process Description"
                                            value={this.props.location.state.process.description}
                                            //onChange={this.props.handleInputChange}
                                            multiLine={true}
                                            rows={2}
                                            />
                                        <br />
                                        <SelectField
                                            id="businessArea"
                                            style={styles.select}
                                            floatingLabelText="Business Area"
                                            value={this.props.location.state.process.businessArea}
                                            //onChange={this.props.handleDefinitionBusinessAreaChange}
                                            >
                                            <MenuItem value={'Mortgage'} primaryText="Mortgage" />
                                            <MenuItem value={'Human Resources'} primaryText="Human Resources" />
                                            <MenuItem value={'Risk and Compliance'} primaryText="Risk and Compliance" />
                                            <MenuItem value={'Operations and Execution'} primaryText="Operations and Execution" />
                                            <MenuItem value={'Marketing'} primaryText="Marketing" />
                                            <MenuItem value={'Sales and Service'} primaryText="Sales and Service" />
                                            <MenuItem value={'IT Management'} primaryText="IT Management" />
                                            <MenuItem value={'Loans'} primaryText="Loans" />
                                        </SelectField>
                                        <br />
                                        <SelectField
                                            id="type"
                                            style={styles.select}
                                            floatingLabelText="Type"
                                            value={this.props.location.state.process.type}
                                            // onChange={this.props.handleDefinitionTypeChange}
                                            >
                                            <MenuItem value={'RPA'} primaryText="RPA" />
                                            <MenuItem value={'Sequential'} primaryText="Sequential" />
                                            <MenuItem value={'Case'} primaryText="Case" />
                                            <MenuItem value={'Modeled'} primaryText="Modeled" />
                                            <MenuItem value={'Check'} primaryText="Check" />
                                        </SelectField>
                                        <br />
                                    </Paper>
                                </div>
                                <div style={styles.slide}>
                                    slide n°2
                                </div>
                                <div style={styles.slide}>
                                    slide n°3
                                </div>
                            </SwipeableViews>
                        </div>
                        <FlatButton label="Update" />
                        <FlatButton label="Exit" />

                        <br />
                        <br />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ProcessCatalogEdit