var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE: process.env.API_BASE || '"//localhost:3000"',
  BASE_URL: process.env.BASE_URL || '"//localhost:8080"',
  IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID
    || '"us-east-1:c38c2a8f-10ef-4583-9d5c-94d73aef009f"',
  REGION: process.env.REGION || '"us-east-1"',
  USER_POOL_ID: process.env.USER_POOL_ID || '"us-east-1_KOxKdaKvK"',
  USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID
    || '"7a4tkdsne66vv66t2r00eekedh"'
})
