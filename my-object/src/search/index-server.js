const React = require('react')
const ReactDOM = require('react-dom')
// const largeNumber = require('large-number-handler')
const logo = require('../assets/aowo.png').default
require('./search.less')

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
            <span onClick={this.loadComponentText.bind(this)}>搜索文字Watch {1000}</span>
            <img src={logo} />
        </div>
    }
}

module.exports = <Search />