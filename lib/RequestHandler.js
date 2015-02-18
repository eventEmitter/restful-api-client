!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , request       = require('request')
        , TokenBucket   = require('token-bucket');



    module.exports = new Class({



        init: function(definition) {
            this.rateLimit      = definition.rateLimit;
            this.backoffStatus  = definition.backoffStatus;
            this.backoffTime    = definition.backoffTime;
            this.threadCount    = definition.threadCount;

            // initalize the token bucket used for
            // rate limiting
            this.bucket = new TokenBucket({
                capacity: this.rateLimit
            });

            // queue
            this.requestQueue = [];

            // indicates how many requests currently are running
            this.runningThreads = 0;

            // indicates if we're currenty waiting for
            // a backoff timeout
            this.waiting = false;
        }



        /**
         * sends a request to the api, respects api rate limits
         *
         * @param <object> request configuration
         * @param <function> callback
         */
        , send: function(config, callback) {

            // add request to the stack

        }



        /**
         * send queued requests
         */
        , _send: function() {
            if (this.runningThreads < this.threadCount) {             
                this.runningThreads++;




                // we're not sendin ganythign, not waiting 
                // for backoff timeouts
                if (this.requestQueue.length) {

                }
            }
        }
    });
}();
