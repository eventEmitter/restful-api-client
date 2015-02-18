!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , asyncMethod   = require('async-method');



    module.exports = new Class({

        init: function(config) {
            this.nextLink = config.next;
            this.prevLink = config.prev;
        }


        /**
         * returns true if this is the first page
         */
        , isFirstPage: function() {
            return !this.prev;
        }



        /**
         * returns true if this is the last page
         */
        , isLastPage: function() {
            return !this.next;
        }



        /**
         * load the next set of items
         *
         * @param <function> optional callback, if omitted promise will be returned
         */
        , next: asyncMethod(function(callback) {
            if (this.isLastPage()) callback(new Error('Cannot load the next page, the last page was already loaded!'));
            else {
                
            }
        })



        /**
         * load the previous set of items
         *
         * @param <function> optional callback, if omitted promise will be returned
         */
        , previous: asyncMethod(function(callback) {
            if (this.isFirstPage()) callback(new Error('Cannot load the previous page, the first page was already loaded!'));
            else {
                
            }
        })
    });
}();
