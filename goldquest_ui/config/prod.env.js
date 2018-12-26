module.exports = {
  NODE_ENV: '"production"',
  API_BASE: process.env.API_BASE || '"//gqapidev.etuper.com"',
  BASE_URL: process.env.BASE_URL || '"//gquidev.etuper.com"',
  
  IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID
    || '"us-east-1:c38c2a8f-10ef-4583-9d5c-94d73aef009f"',
  REGION: process.env.REGION || '"us-east-1"',
  USER_POOL_ID: process.env.USER_POOL_ID || '"us-east-1_KOxKdaKvK"',
  USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID
    || '"7a4tkdsne66vv66t2r00eekedh"'
}
