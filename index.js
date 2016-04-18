var request = require('superagent')
var q = require('q')
var _ = require('lodash')

module.exports = function (options) {
  var defaultPayload = {
    username: 'Bot',
    channel: '#general'
  }

  var webhookUrl = options.url
  defaultPayload = options.payload || defaultPayload

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

      var deferred = q.defer()
      sendRequest(_.merge(_.clone(defaultPayload), finalPayload), function (err, res) {
        if (err) {
          deferred.reject(err)
        }
        deferred.resolve(res)
      })
      return deferred.promise
    }
  }
}
