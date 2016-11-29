import React from 'react'
import { Component } from 'react'
import agent from 'superagent'
import ProcessCatalogCard from './ProcessCatalogCard'
import avatar from '../images/avatar.jpg'
import ProcessCatalogAddFloatingButton from './ProcessCatalogAddFloatingButton'

let style = {
    margin: 20,
    textAlign: 'center'
}

class ProcessCatalogCardList extends Component {
    constructor() {
        super()
        this.state = { process: [] }
    }

    componentDidMount() {
        agent.get('http://localhost:3000/api/Processes')
            .then(function(res) {
                this.setState({ process: res.body });
                console.log(this.state)
            }.bind(this));
    }

    render() {
        let cards = [];
        for (var i = 0; i < this.state.process.length; i++) {
            cards.push(
                <ProcessCatalogCard process={this.state.process[i]} avatar={avatar} key={i}  />
            )
        }
        return (
            <div>
                <br />
                <br />
                <br />
                <div style={style}>{cards}</div>
                <ProcessCatalogAddFloatingButton />
            </div>
        )
    }
}

export default ProcessCatalogCardList