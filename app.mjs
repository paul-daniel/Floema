import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.mjs'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000

// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH
  }
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', async (_req, res) => {
  // Here we are retrieving the first document from your API endpoint
  try {
    const home = await client.getSingle('home')
    const meta = await client.getSingle('metadata')
    res.render('pages/home', {
      home,
      meta
    })
  } catch (error) {
    console.error(error)
  }
})
app.get('/about', async (_req, res) => {
  try {
    const about = await client.getSingle('about')
    const meta = await client.getSingle('metadata')
    console.log({about,meta})
    res.render('pages/about', {
      about,
      meta
    })
  } catch (error) {
    console.error(error)
  }
  
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