!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log');



    module.exports = new Class({

        /**
         * apply a set of parameters to the request
         * 
         * @param <Object> the request definition
         * @param <Object> the parameters to apply
         */
        buildRequest: function(request, parameters) {
            if (type.object(parameters)) {
                if (!request.query) request.query = parameters;
                else {
                    Object.keys(parameters).forEach(function(key) {
                        parameters[key] = parameters[key];
                    });
                }
            }
        }
    });
}();
