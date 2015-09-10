/**
 * Require dependencies
 */

var moment = require('moment'),
    _      = require('lodash');

var Collection = require('ampersand-collection');

var Hours = require('./hours-state.js');

var serialize = require('mgscarp-openinghours-serialize');

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



/**
 * Define default vocabulary
 */

var VOCABULARY = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];


/**
 * Parse
 *
 * @param  {Mixed} text
 * @param  {[Object]} options
 * @return {Object}
 */


function parse (text, options) {
    if (typeof text != 'string')
        return text;

    options = options || {};

    var result = [];

    var vocabulary = options.vocabulary || VOCABULARY;

    text.trim()
        .split('\n')
        .forEach(function(day){
            var arr = day.match(/(\w+)\.:(.+)/);

            var dayName = arr[1],
                dayHours = arr[2]
                    .trim()
                    .split(/,\s/g);


            var offset = vocabulary.indexOf(dayName) * 1440;

            dayHours.forEach(function(str){
                var arr = rangeToHours(str, offset);

                result.push(arr);
            });
        });

    function rangeToHours (str, offset) {
        var arr = str.match(/([0-9:]+)[\s-]+([0-9:]+)/);

        function toMinutes (t) {
            return moment.duration(t).asMinutes()
                + offset;
        }

        return [ toMinutes(arr[1]), toMinutes(arr[2]) ];
    }

    return result;
};
