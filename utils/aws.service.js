const debug = require('debug')('utils:awsSDK')
const config = require('@/../config/config.js')
const AWS = require('aws-sdk')

export default class AWSSDK {
  constructor() {
    debug('Init AWSSDK')
    this.initConfig()
    debug('Initialized AWSSDK')
  }

  initConfig() {
    AWS.Config.region = config.region
    AWS.Config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.cognito.IdentityPoolId
    })
  }

  setCredentials(token) {
    AWS.config.region = config.region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.cognito.IdentityPoolId,
      Logins: {
        [`cognito-idp.${config.region}.amazonaws.com/${config.cognito.UserPoolId}`]: token
      }
    })
  }

  refreshCredentials(callback) {
    AWS.config.credentials.refresh(callback)
  }
}

