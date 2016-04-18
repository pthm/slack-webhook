var request = require('superagent')
var _ = require('lodash')

module.exports = function (options) {
  var defaultPayload = {
    username: 'Bot',
    channel: '#general'
  }

  var webhookUrl = options.url
  defaultPayload = options.payload || defaultPayload
  var PromiseWrapper = options.promise || Promise

  function sendRequest (payload, cb) {
    return request.post(webhookUrl).send(payload).end(cb)
  }

  return {
    send: function (payload) {
      var finalPayload

      if (typeof payload === 'string') {
        finalPayload = {
          text: payload
        }
      } else {
        finalPayload = payload
      }

      return new PromiseWrapper(function (resolve, reject) {
        sendRequest(_.merge(_.clone(defaultPayload), finalPayload), function (err, res) {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
      })
    }
  }
}
