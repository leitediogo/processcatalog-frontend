import React from 'react'
import { Component } from 'react'
import agent from 'superagent'

class ProcessCatalogList extends Component {

  constructor() {
    super();
    this.state = { ProcessCatalogNames: [], ProcessCatalogs: [] };
  }

  componentDidMount() {
    let ProcessCatalogList = [];
    let ProcessCatalogNamesList = [];
    agent.get('http://localhost:3000/api/ProcessCatalogs').then(function onResult(res) {
      ProcessCatalogList = res.body;
      if (ProcessCatalogList != null) {
        for (var i = 0; i < ProcessCatalogList.length; i++) {
          ProcessCatalogNamesList.push(ProcessCatalogList[i].name);
        }
      }
      this.setState({ ProcessCatalogNames: ProcessCatalogNamesList, ProcessCatalogs: ProcessCatalogList });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div> ProcessCatalog Names List: {this.state.ProcessCatalogNames} </div>
        <div>ProcessCatalogs List: {JSON.stringify(this.state.ProcessCatalogs) } </div>
      </div>
    );
  }
}

export default ProcessCatalogList