import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.mjs'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import PrismicDom from 'prismic-dom'
import express from 'express'

// INIT
dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000

// HELPER FUNCTIONS
const handleLinkResolver = doc => {
  if (doc.type === 'product') {
    return `/detail/${doc.uid}`
  }

  if (doc.type === 'about') {
    return '/about'
  }

  if (doc.type === 'collections') {
    return '/collections'
  }
}

const handleRequest = async () => {
  try {
    const meta = await client.getSingle('metadata')
    const preloader = await client.getSingle('preloader')
    const navigation = await client.getSingle('navigation')
    return {
      meta,
      navigation,
      preloader
    }
  } catch (error) {
    console.error('handle Request failed', error)
  }
}

// MIDDLEWARE
// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH
  }
  res.locals.Link = handleLinkResolver
  res.locals.PrismicDom = PrismicDom
  next()
  res.locals.Numbers = index => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }
})

// EXPRESS SET CONFIGURATION
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// EXPRESS ROUTES
app.get('/', async (_req, res) => {
  // Here we are retrieving the first document from your API endpoint
  try {
    const home = await client.getSingle('home')
    const collections = await client.getAllByType('collection')
    const defaults = await handleRequest()
    res.render('pages/home', {
      ...defaults,
      home,
      collections
    })
  } catch (error) {
    console.error('Get request for homepage failed', error)
  }
})

app.get('/about', async (_req, res) => {
  try {
    const about = await client.getSingle('about')
    const defaults = await handleRequest()
    res.render('pages/about', {
      ...defaults,
      about
    })
  } catch (error) {
    console.error('Get request for about failed', error)
  }
})

app.get('/collections', async (_req, res) => {
  try {
    const collections = await client.getAllByType('collection', {
      fetchLinks: 'product.image'
    })
    const home = await client.getSingle('home')
    const defaults = await handleRequest()
    res.render('pages/collection', {
      ...defaults,
      collections,
      home
    })
  } catch (error) {
    console.error('Get request for collections failed', error)
  }
})

app.get('/detail/:uid', async (req, res) => {
  try {
    const detail = await client.getByUID('product', req.params.uid, {
      fetchLinks: 'collection.title'
    })
    const defaults = await handleRequest()
    res.render('pages/detail', {
      ...defaults,
      detail
    })
  } catch (error) {
    console.error('Get request for path details failed', error)
  }
})

// LAUNCH SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
