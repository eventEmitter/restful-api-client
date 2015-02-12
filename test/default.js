
	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, assert 		= require('assert')
		, Webservice 	= require('ee-webservice');



	var   RESTfulAPIClient 	= require('../')
		, APISpecfication 	= require('./APISpecfication')
		, APIImplementation
		, client;



	describe('The RESTfulAPIClient', function() {
		before(function(done) {
			// setting up the webserver
			var service = new Webservice({
				  port:         8000
    			, interface:    Webservice.IF_ANY
			});

			// add middlewares for the tests
			service.use(function(request, response) {
				response.send(JSON.stringify({
					data: []
				}));
			});


			// listen
			service.listen(done)
		});



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



		it('should not crash when instantiated', function() {

			//log(client.movies(3), client.movies(3).images);
			client.movies(3).images().list();
		});
	});
	