import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


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
    }
}

class WizardIdentification extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Paper zDepth={0} style={styles.paper}>
                        <TextField
                            id="name"
                            hintText="Insert Process Name"
                            floatingLabelText="Process Name"
                            value={this.props.definition.name}
                            onChange={this.props.handleDefinitionInputChange}
                            />
                        <br />
                        <TextField
                            id="description"
                            hintText="Insert Process Description"
                            floatingLabelText="Process Description"
                            value={this.props.definition.description}
                            onChange={this.props.handleDefinitionInputChange}
                            multiLine={true}
                            rows={2}
                            />
                        <br />
                        <SelectField
                            id="businessArea"
                            style={styles.select}
                            floatingLabelText="Business Area"
                            value={this.props.definition.businessArea}
                            onChange={this.props.handleDefinitionBusinessAreaChange}
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
                            value={this.props.definition.type}
                            onChange={this.props.handleDefinitionTypeChange}
                            >
                            <MenuItem value={'RPA'} primaryText="RPA" />
                            <MenuItem value={'Sequential'} primaryText="Sequential" />
                            <MenuItem value={'Case'} primaryText="Case" />
                            <MenuItem value={'Modeled'} primaryText="Modeled" />
                            <MenuItem value={'Check'} primaryText="Check" />
                        </SelectField>
                        <br />
                    </Paper>
                    <br />
                    <br />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default WizardIdentification