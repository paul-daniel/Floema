const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (_req, res) => {
  res.render('pages/home')
})
app.get('/about', (_req, res) => {
  res.render('pages/about')
})
app.get('/collections', (_req, res) => {
  res.render('pages/collections')
})
app.get('/details/:id', (_req, res) => {
  res.render('pages/details')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
