import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import agent from 'superagent'

let style = {
    margin: 20,
    textAlign: 'center'
}

class ProcessCatalog extends Component {
    constructor() {
        super()
        this.state = { id: 0, title: '', description: '', status: '' }
        this.handleChange = this.handleChange.bind(this);
    }
    
    saveProcessCatalog() {
        agent.post('http://localhost:3000/api/Processes')
            .send({
                id: this.state.id,
                name: this.state.title,
                description: this.state.description,
                status: "ongoing",
                createdById: 0,
                ownerId: 0,
                categoryId: 1,
                dueDt: "2016-10-28",
                creationDt: "2016-10-28",
                lastUpdateDt: "2016-10-28"
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error');
                } else {
                    console.log('yay got ' + JSON.stringify(res.body));
                }
            })
    }

    handleChange(name, e) {
        let change = {}
        change[name] = e.target.value;
        this.setState(change);
        console.log(change);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Paper zDepth={1} style={style}>
                        <form>
                            <TextField
                                ref='id'
                                hintText="Insert ProcessCatalog Id"
                                floatingLabelText="ProcessCatalog Id"
                                onChange={this.handleChange.bind(this, "id")}
                                />
                            <br />
                            <TextField
                                ref='title'
                                hintText="Insert ProcessCatalog Title"
                                floatingLabelText="ProcessCatalog Title"
                                onChange={this.handleChange.bind(this, "title")}
                                />
                            <br />
                            <TextField
                                ref='description'
                                hintText="Insert ProcessCatalog Descritption"
                                floatingLabelText="ProcessCatalog Description"
                                onChange={this.handleChange.bind(this, "description")}
                                />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <FlatButton label="Cancel" href="/" />
                            <FlatButton label="Save" onTouchTap={this.saveProcessCatalog.bind(this)} href="/" />
                        </form>
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ProcessCatalog