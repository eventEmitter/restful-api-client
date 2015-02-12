!function() {

	var   Class 		= require('ee-class')
        , type          = require('ee-types')
		, log 			= require('ee-log')
        , Entity        = require('./Entity');




    var staticMethodNames = [
          'QueryOffsetHandler'
        , 'QueryListRequestBuilder'
        , 'QueryLimitHandler'
        , 'ResponseEnvelopeHandler'
        , 'EnvelopePaginator'
    ];






    /**
     * The actual api generator
     */
	var APIClient = module.exports = new Class({

		init: function(definition) {
            this._buildApi(definition);
		}


        /**
         * create the api interface from the specifications
         */
        , _buildApi: function(definition) {
            Object.keys(definition.resources).forEach(function(resourceName) {
                this[resourceName] = new Entity(resourceName, definition.resources[resourceName], definition);
            }.bind(this));
        }
	});







    // set static methods
    APIClient.applyTo = function(target) {
        staticMethodNames.forEach(function(name) {
            target[name] = require('../middlewares/'+name);
        });
    }


    // expose the middlewares on the constructor
    APIClient.applyTo(APIClient);    
}();
