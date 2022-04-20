require('dotenv').config()

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
app.get('/collection', (_req, res) => {
  res.render('pages/collection')
})
app.get('/detail/:id', (_req, res) => {
  res.render('pages/detail')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
