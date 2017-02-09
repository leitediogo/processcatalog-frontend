import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
    floatButton: {
        margin: 12,
        marginRight: 20,
        marginLeft: 20,
        position: "fixed",
        bottom: "8%",
        right: "1%",
        backgroundColor: '#0097A7'
    }
}

class ProcessCatalogAddFloatingButton extends Component {
    constructor() {
        super();
        this.state = { ProcessCatalogState: '' }
    }
    render() {
        return (
            <FloatingActionButton style={styles.floatButton} href="\addProcess">
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

export default ProcessCatalogAddFloatingButton