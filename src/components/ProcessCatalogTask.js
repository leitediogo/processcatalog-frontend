import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

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

class ProcessCatalogTask extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card zDepth={1} style={styles.card}>
                        <CardHeader
                            title="Created By"
                            subtitle={this.props.article}
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                        <CardTitle
                            title="title"
                            subtitle="subtitle"
                            />
                        <CardText>text</CardText>


                    </Card>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default ProcessCatalogTask;