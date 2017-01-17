import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import agent from 'superagent'

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    card: {
        margin: 20,
        textAlign: 'center'
    },
    paper: {
        margin: 20,
        textAlign: 'center'
    },
    select: {
        align: 'left'
    }
}

const api_server_name=process.env.REACT_APP_API_SERVER_NAME
const api_server_port=process.env.REACT_APP_API_SERVER_PORT

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

    handlePublish = () => {
        this.putProcess(this.props.process.id)
        window.location.reload()
    }

    putProcess(id) {
        console.log('putting process!')
        this.props.process.definition.status = 'Production'
        agent.put('http://' +  api_server_name + ':' + api_server_port + '/api/Processes')
            .send({
                id: id,
                name: this.props.process.name,
                definition: this.props.process.definition
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.error(err);
                } else {
                    console.log('yay! process putted ' + JSON.stringify(res.body));
                }
            })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card zDepth={1} style={styles.card} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
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
                            <div>
                                <label> <b> Description </b> </label>
                                <p>{this.props.process.definition.description}</p>
                                <TextField
                                    disabled={true}
                                    defaultValue={this.props.process.definition.version}
                                    floatingLabelText="Version"
                                    /><br />
                                <TextField
                                    disabled={true}
                                    defaultValue={this.props.process.definition.status}
                                    floatingLabelText="Status"
                                    /><br />

                                <TextField
                                    disabled={true}
                                    defaultValue={this.props.process.definition.type}
                                    floatingLabelText="Type"
                                    /><br />
                            </div>
                        </CardMedia>
                        <CardActions expandable={true}>
                            <FlatButton label="Publish" onClick={this.handlePublish} />
                            <FlatButton label="Edit" onClick={this.handleExpand} />
                        </CardActions>

                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ProcessCatalogCard