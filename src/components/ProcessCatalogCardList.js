import React from 'react'
import { Component } from 'react'
import ProcessCatalogCard from './ProcessCatalogCard'
import ProcessCatalogAddFloatingButton from './ProcessCatalogAddFloatingButton'
import { connectProfile } from '../auth'

let style = {
    margin: 20,
    textAlign: 'center'
}

class ProcessCatalogCardList extends Component {

    render() {
        const {profile} = this.props
        let cards = [];
        for (var i = 0; i < this.props.processes.length; i++) {
            cards.push(
                <ProcessCatalogCard process={this.props.processes[i]} key={i} />
            )
        }
        return (
            <div>
                <br />
                <br />
                <br />
                <div style={style}>{cards}</div>
                {(profile) ? <ProcessCatalogAddFloatingButton /> : ''}
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default connectProfile(ProcessCatalogCardList)