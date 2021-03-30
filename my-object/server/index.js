
if (typeof window === 'undefined') {
    global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

const server = (port) => {
    const app = express()

    app.use(express.static('dist'))
    app.get('/search', (req, res) => {
        res.status(200).send(renderMarkup(renderToString(SSR)))
    })

    app.listen(port, () => {
        console.log('localhost:' + port)
    })
}

server(process.env.PORT || 3000)

function renderMarkup (html) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${html}
    </body>
    </html>`
}