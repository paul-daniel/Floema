import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.mjs'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import PrismicDom from 'prismic-dom'
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
  res.locals.PrismicDom = PrismicDom
  next()
  res.locals.Numbers = index => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', async (_req, res) => {
  // Here we are retrieving the first document from your API endpoint
  try {
    const home = await client.getSingle('home')
    const meta = await client.getSingle('metadata')
    const preloader = await client.getSingle('preloader')
    res.render('pages/home', {
      home,
      meta,
      preloader
    })
  } catch (error) {
    console.error(error)
  }
})
app.get('/about', async (_req, res) => {
  try {
    const about = await client.getSingle('about')
    const meta = await client.getSingle('metadata')
    const preloader = await client.getSingle('preloader')
    res.render('pages/about', {
      meta,
      about,
      preloader
    })
  } catch (error) {
    console.error(error)
  }
})
app.get('/collections', async (_req, res) => {
  const meta = await client.getSingle('metadata')
  const collections = await client.getAllByType('collection', {
    fetchLinks: 'product.image'
  })
  const home = await client.getSingle('home')
  const preloader = await client.getSingle('preloader')
  res.render('pages/collection', {
    meta,
    collections,
    home,
    preloader
  })
})
app.get('/detail/:uid', async (req, res) => {
  // To get the UID
  // req.params.uid
  const detail = await client.getByUID('product', req.params.uid, {
    fetchLinks: 'collection.title'
  })
  const meta = await client.getSingle('metadata')
  const preloader = await client.getSingle('preloader')
  res.render('pages/detail', {
    meta,
    detail,
    preloader
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
