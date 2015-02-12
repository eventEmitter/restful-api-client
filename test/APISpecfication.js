!function() {
    var RESTfulAPIClient = require('../')
        , log = require('ee-log');



    module.exports = {
          host          : 'http://api.cinergy.ch'
        , baseURL       : '/v1.0/cinema'
        , backoffStatus : 429
        , backoffTime   : 10
        , rateLimit     : 60
        , methods: {
            list: {
                  httpMethod        : 'get'
                , requestBuilder    : new RESTfulAPIClient.QueryListRequestBuilder()
                , offsetHandler     : new RESTfulAPIClient.QueryOffsetHandler()
                , limitHandler      : new RESTfulAPIClient.QueryLimitHandler()
                , envelopeHandler   : new RESTfulAPIClient.ResponseEnvelopeHandler()
                , paginator         : new RESTfulAPIClient.EnvelopePaginator('links.next.href', 'links.previous.href')
                , emptyResultStatus : 404
                , headers: {
                    accept: 'application/json'
                }
            }
        }
        , resources: {
            movies: {
                  list: '/movies'
                , resources: {
                    images: {
                        list: '/images'
                    }
                }
            }
        }
    }
}();
