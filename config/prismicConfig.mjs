// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from 'node-fetch'
import * as prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()

const repoName = process.env.PRISMIC_REPO_NAME // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN // If your repo is private, add an access token.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: 'home',
    path: '/home'
  },
  {
    type: 'about',
    path: '/about'
  }
]

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes
})
