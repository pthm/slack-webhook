var request = require('superagent');
var q = require('q')
var _ = require('lodash');

module.exports = function(options){
	var defaultPayload = {
	  username: "Bot",
	  channel: "#general"
	}

	var webhookUrl = options.url;
	var defaultPayload = options.payload  || defaultPayload;

	function sendRequest(payload, cb){
		return request.post(webhookUrl).send(payload).end(cb)
	}

	return {
		send: function(text){
			var payload = {
				text: text
			}
			var deferred = q.defer();
			sendRequest(_.merge(defaultPayload, payload), function(err, res){
				if(err){
					deferred.reject(err)
				}
				deferred.resolve(res)
			})
			return deferred.promise;
		}
	}
}
