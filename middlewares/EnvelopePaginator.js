!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log');



    module.exports = new Class({

          nextLink: 'links.next.href'
        , prevLink: 'links.previous.href'



        , init: function(nextLink, prevLink) {
            if (nextLink) this.nextLink = nextLink;
            if (prevLink) this.prevLink = prevLink;
        }



        
        /**
         * extract the next and previous page links
         * 
         * @param <Object> responseData
         */
        , parseResponse: function(responseData) {
            return {
                  next: this._extractEnvelopeData(responseData, this.nextLink)
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
