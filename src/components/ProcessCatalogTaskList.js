import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import ProcessCatalogTask from './ProcessCatalogTask'

let style = {
    margin: 20,
    textAlign: 'center'
}
const articles = [
    { id: 'a', timestamp: 811396800000, name: 'Netscape 2.0 ships, introducing Javascript' },
    { id: 'b', timestamp: 1108702800000, name: 'Jesse James Garrett releases AJAX spec' },
    { id: 'c', timestamp: 1156564800000, name: 'jQuery 1.0 released' },
    { id: 'd', timestamp: 1256443200000, name: 'First underscore.js commit' },
    { id: 'e', timestamp: 1286942400000, name: 'Backbone.js becomes a thing' },

    { id: 'f', timestamp: 1331697600000, name: 'Angular 1.0 released' },
    { id: 'g', timestamp: 1369800000000, name: 'React is open-sourced; developers rejoice' }
]
class ProcessCatalogTaskList extends Component {

    renderCards() {
        console.log('renderCards')
        let cards = articles.map(function (article) {
            return (<ProcessCatalogTask article={article.name} id={article.id} />)
        })
        console.log(cards)
    }



    render() {
        /*
        let cards = []
        for (var i = 0; i < articles.length; i++) {
            cards.push(
                <ProcessCatalogTask article={articles[i].name} key={i} />
            )
        }*/

        console.log('renderCards')
        let cards = articles.map(function (article) {
            return (<ProcessCatalogTask article={article.name} key={article.id} />)
        })
        console.log(cards)
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          <div style={style}>{cards}</div>
        </FlipMove>
                <br />
                <br />
                <br />
            </div>

        )
    }
}

export default ProcessCatalogTaskList