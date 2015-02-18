!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log');



    module.exports = new Class({

          nextLink: 'links.next.href'.split('.')
        , prevLink: 'links.previous.href'.split('.')



        , init: function(nextLink, prevLink) {
            if (nextLink) this.nextLink = nextLink.split('.');
            if (prevLink) this.prevLink = prevLink.split('.');
        }



        
        /**
         * extract the next and previous page links
         * 
         * @param <Object> responseData
         */
        , parseResponse: function(responseData) {
            return {
                  type: 'envelope'
                , next: this._extractEnvelopeData(responseData, this.nextLink)
                , prev: this._extractEnvelopeData(responseData, this.prevLink)
            };
        }




        /**
         * extracts a link from the envelope
         */
        , _extractEnvelopeData: function(data, envelope) {
            if (envelope && envelope.length) {
                if (data[envelope[0]]) {
                    return this._extractEnvelopeData(data[envelope[0]], envelope.slice(1));
                }
                else return undefined;
            }
            else return data;
        } 
    });
}();
