!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , Model         = require('./Model')
        , QueryBuilder  = require('./QueryBuilder');



    /*
     * the entity builder sets up the entites constructor
     * and the query builder as well as the model
     */


    module.exports = new Class({

        init: function(options) {
            var thisContext = this;

            // create the custom query builder 
            this.createQueryBuilder(options.definition);

            // create the custom model
            this.createModel(options.definition);


            // we need to return a custom constructor in order
            // to be able to differentiate between list and 
            // create requests
            var Constructor = function(parameters) {

                if (this instanceof Constructor) {
                    // creating stuff
                    return new thisContext.Model(parameters);
                }
                else {
                    // listing or bulk updating stuff
                    return new thisContext.QueryBuilder(parameters);
                }
            };


            // the class constructor supports returning 
            // custom objects
            return Constructor;
        }




        /**
         * set up the custom query builder
         */
        , createQueryBuilder: function(definition) {
            this.QueryBuilder = new QueryBuilder(definition);
        }


        /**
         * set up the model builder
         */
        , createModel: function(definition) {
            this.Model = new Model(definition);
        }
    });
}();
