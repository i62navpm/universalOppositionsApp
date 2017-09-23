import AWS from 'aws-sdk'
const debug = require('debug')('utils:LambdaSDK')

export default class AWSLambdaSDK {
  constructor() {
    debug('Init AWSLambdaSDK')
    debug('Initialized AWSLambdaSDK')
  }

  invoke(payload) {
    let lambda = new AWS.Lambda()
    var pullParams = {
      FunctionName: 'oppositionFunction',
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify(payload)
    }

    return new Promise((resolve, reject) => {
      lambda.invoke(pullParams, function (error, data) {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(data.Payload))
        }
      })
    })
  }
}
