import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

let style = {
    margin: 20,
    textAlign: 'center'
}

class ProcessCatalogCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card zDepth={1} style={style} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                        <CardHeader
                            title="Created By"
                            subtitle={this.props.process.definition.createdBy}
                            avatar={this.props.avatar}
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                        <CardTitle
                            title={this.props.process.definition.name}
                            subtitle={this.props.process.definition.businessArea}
                            />
                        <CardText>{this.props.process.definition.cardText}</CardText>
                        <CardMedia expandable={true}>
                            <p>process data</p>
                        </CardMedia>
                        <CardActions expandable={true}>
                            <FlatButton label="Save" onClick={this.handleReduce}  disabled={true} />
                            <FlatButton label="Edit" onClick={this.handleExpand} />
                        </CardActions>

                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ProcessCatalogCard