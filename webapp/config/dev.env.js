var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: JSON.stringify(process.env.API_URL),
  AMAZON_REDIRECT: JSON.stringify(process.env.AMAZON_REDIRECT)
})
