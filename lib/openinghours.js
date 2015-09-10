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
 * Define default vocabulary and RegExp
 */

var vocabulary = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];


var re = {
        daySplit: /\n/g,
        dayMatch: /(\w+):(.+)/,
        hoursSplit: /\s/g,
        hoursMatch: /([0-9:]+)[\s-]+([0-9:]+)/
    };

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

    vocabulary = options.vocabulary || vocabulary;

    _.assign(re, options);

    text.trim()
        .split(re.daySplit)
        .forEach(function(day){
            var arr = day.match(re.dayMatch);

            var dayName = arr[1],
                dayHours = arr[2]
                    .trim()
                    .split(re.hoursSplit);


            var offset = vocabulary.indexOf(dayName) * 1440;

            dayHours.forEach(function(str){
                var arr = rangeToHours(str, offset);

                result.push(arr);
            });
        });

    function rangeToHours (str, offset) {
        var arr = str.match(re.hoursMatch);

        function toMinutes (t) {
            return moment.duration(t).asMinutes()
                + offset;
        }

        return [ toMinutes(arr[1]), toMinutes(arr[2]) ];
    }

    return result;
};
