!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , asyncMethod   = require('async-method');



    /**
     * the query builder is used to create list and
     * bulk update calls
     */


    module.exports = new Class({

        init: function(options) { log(options);

            // store parameters passed to the query builder
            this.parameters = options.parameters;

            // maybe we got an id, store it
            if (this.parameters && this.parameters.length) {
                this.id = type.object(this.parameters[0]) && this.parameters[0] !== null ? this.parameters.id : this.parameters[0];
            }
            

            // store references to the parent query builder
            if (options.parent) this.parent = options.parent;
        }



        /**
         * execute the list function, 
         * build the requests using the middlewares
         * passed in the configurations
         */
        , list: asyncMethod(function(callback) {
            var request = {};

            // http method
            request.method = this._list.method;

            // set the default headers
            request.headers = this._list.headers;

            // build url
            request.url = this._buildListUrl();

            log(request);
        })




        , _buildListUrl: function() {
            var url = '';

            if (this.parent) url += this.parent._buildListUrl();

            if (this.id) return url + this._list.url + '/' + this.id;
            else return url + this._list.url;
        }
    });
}();
