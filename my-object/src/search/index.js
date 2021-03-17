'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import logo from '../assets/aowo.png'

class Search extends React.Component {

    constructor() {
        super(...arguments)

        this.state = {
            Text: null
        }
    }

    loadComponentText () {
        import('./dynamic').then(Text => {
            this.setState({
                Text: Text.default
            })
        })
    }

    render () {
        const { Text } = this.state

        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            <span onClick={this.loadComponentText.bind(this)}>搜索文字Watch</span>
            <img src={logo} />
        </div>
    }
}

ReactDOM.render(
    <Search></Search>,
    document.querySelector('#root')
)