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
        this.state = { ProcessCatalogsBody: [] }
    }

    componentDidMount() {
        
        agent.get('http://localhost:3000/api/Processes')
            .then(function(res) {
                this.setState({ ProcessCatalogsBody: res.body });
            }.bind(this));
            
    }

    render() {
        let cards = [];
        for (var i = 0; i < this.state.ProcessCatalogsBody.length; i++) {
            cards.push(<ProcessCatalogCard
                title={this.state.ProcessCatalogsBody[i].name}
                subTitle={this.state.ProcessCatalogsBody[i].description}
                createdBy={this.state.ProcessCatalogsBody[i].createdById}
                avatar={avatar}
                cardText={this.state.ProcessCatalogsBody[i].description}
                key={i} />);
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