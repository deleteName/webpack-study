'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { a } from './tree-shaking'
import './search.less'
import logo from '../assets/aowo.png'

class Search extends React.Component {

    render () {
        return <div className="search-text">
            <span>{ a() }搜索文字Watch</span>
            <img src={logo} />
        </div>
    }
}

ReactDOM.render(
    <Search></Search>,
    document.querySelector('#root')
)