!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , ListPaginator = require('./ListPaginator');



    module.exports = new Class({

        init: function(definition) {
            var list;

            if (definition.methods.list) {
                list = definition.methods.list;

                if (list.envelopeHandler) this.envelopeHandler = list.envelopeHandler;
                if (list.paginator) this.paginator = list.paginator;
            }
        }



        /**
         * parse the response
         *
         * @param <object> response 
         */
        , parseResponse: function(response, callback) {
            this.getBody(response, function(err, rawData) {
                if (err) callback(err);
                else {
                    var   data      = this.envelopeHandler ? this.envelopeHandler.parseResponse(rawData) : rawData
                        , paginator = new ListPaginator(this.paginator.parseResponse(rawData));

                    callback(null, data, paginator);
                }
            }.bind(this));
        }




        /**
         * parse body data from request
         */
        , getBody: function(response, callback) {
            var   contentType = this.getHeader(response, 'content-type')
                , data;

            if (contentType === 'application/json') {
                try {
                    data = JSON.parse(response.body);
                } catch(e) {
                    return callback(new Error('Failed to parse response data: '+e.message));
                }

                callback(null, data);
            }
            else callback();
        }




        /**
         * returns a speĉific header from the response
         */
        , getHeader: function(response, headerName) {
            if (response && response.headers && response.headers[headerName]) return response.headers[headerName].trim().toLowerCase();
            return null;
        }
    });
}();
