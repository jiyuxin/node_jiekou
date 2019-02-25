const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(3000, function () {
  console.log('servers is running...!!!')
})