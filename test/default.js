
	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, assert 		= require('assert');



	var   RESTfulAPIClient 	= require('../')
		, APISpecfication 	= require('./APISpecfication')
		, APIImplementation
		, client;



	describe('The RESTfulAPIClient', function() {
		it('should not crash when inherited from', function() {
			APIImplementation = new Class({
				inherits: RESTfulAPIClient


				, init: function init(APIKey) {
					this.apiKey = APIKey;

					// automatically build the api
					init.super.call(this, APISpecfication);
				}


				/**
				 * add my auth token to each of the requests
				 */
				, prepareRequest: function(request) {
		            if (!request.headers) request.headers = {};

		            request.headers['cinergy-token'] = this.authToken;
		        }
			});
		});


		it('should not crash when instantiated', function() {
			client = new APIImplementation('a--b');
		});		
	});
	