'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import './search.less'
import logo from './assets/aowo.png'

class Search extends React.Component {

    render () {
        return <div className="search-text">
            <span>搜索文字Watch搜索</span>
            <img src={ logo } />
        </div>
    }
}

ReactDOM.render(
    <Search></Search>,
    document.querySelector('#root')
)