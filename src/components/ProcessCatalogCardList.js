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
        //filter by Business Area
        let processFilterByArea
        console.log (this.props.filter)
        if (!this.props.filter || this.props.filter === 'All')
            processFilterByArea= this.state.process
        else
            processFilterByArea = this.state.process.filter(function(process) {
                return process.definition.businessArea === 'Marketing'
            })

        let cards = [];
        for (var i = 0; i < processFilterByArea.length; i++) {
            cards.push(
                <ProcessCatalogCard process={processFilterByArea[i]} avatar={avatar} key={i} />
            )
        }
        return (
            <div>
                <br />
                <br />
                <br />
                <div style={style}>{cards}</div>
                <ProcessCatalogAddFloatingButton />
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default ProcessCatalogCardList