const debug = require('debug')('utils:LambdaMockSDK')
const paginate = require('paginate-array')
const AWS = require('aws-sdk')
const JsSearch = require('js-search')

export default function AWSLambdaMock(query = '', sortBy = 'posicion', descending = false, pageNumber = 1, numItemsPerPage = 5) {
  debug('Init AWSLambdaMockSDK')
  debug('Initialized AWSLambdaMockSDK')

  let S3 = new AWS.S3()
  var params = {
    Bucket: 'opositions',
    Key: 'listadoGeneralIngles.json'
  }
  return new Promise((resolve, reject) => {
    S3.getObject(params, (err, data) => {
      if (err) {
        reject(err.stack)
        return
      }

      let collection = JSON.parse(data.Body.toString('utf8'))

      if (query) {
        var search = new JsSearch.Search('posicion')
        search.addIndex('posicion')
        search.addIndex('nombre')
        search.addDocuments(collection)
        collection = search.search(query)
      }
      if (sortBy) {
        collection = collection.sort((a, b) => {
          const sortA = a[sortBy]
          const sortB = b[sortBy]

          if (descending) {
            if (sortA < sortB) return 1
            if (sortA > sortB) return -1
            return 0
          } else {
            if (sortA < sortB) return -1
            if (sortA > sortB) return 1
            return 0
          }
        })
      }
      const paginateCollection = paginate(collection, pageNumber, numItemsPerPage)
      resolve(paginateCollection)
    })
  })
}
