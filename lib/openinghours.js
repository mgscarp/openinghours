/**
 * Require dependencies
 */

var moment = require('moment'),
    _      = require('lodash');

var Collection = require('ampersand-collection');

var Hours = require('./hours-state.js');

var serialize = require('mgscarp-openinghours-serialize'),
    parse     = require('mgscarp-openinghours-parse');

/**
 * Declare
 */

var OpeningHours;


/**
 * Extend ampersand Collection
 */

OpeningHours = Collection.extend({
    model: Hours,
    serialize: function () {
        var data = this.map(function(hr){
                return hr.serialize();
            });

        return serialize(data);
    },
    parse: function (attrs, options) {
        return parse(attrs, options) || attrs;
    }
});


/**
 * Expose `OpeningHours`
 */

module.exports = OpeningHours;

