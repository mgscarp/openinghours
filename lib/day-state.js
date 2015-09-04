var _ = require('lodash');

var Model = require('ampersand-state');


var HoursCollection = require('./hours-collection.js');

/**
 * Define weekdays
 */

var vocabulary = {
        'Monday'    : 'Mo',
        'Tuesday'   : 'Tu',
        'Wednesday' : 'We',
        'Thursday'  : 'Th',
        'Friday'    : 'Fr',
        'Saturday'  : 'Sa',
        'Sunday'    : 'Su'
    };





var inputOptions = {};


inputOptions.parse = function (raw) {
    if (typeof raw != 'string')
        return false;

    var dayNamesMap = {
            'Mon': 'Monday',
            'Tue': 'Tuesday',
            'Wed': 'Wednesday',
            'Thu': 'Thursday',
            'Fri': 'Friday',
            'Sat': 'Saturday',
            'Sun': 'Sunday'
        };

    var re = /(\w+)\.:(.+)/;

    var arr = raw.match(re);

    return {
        dayOfWeek   : dayNamesMap[arr[1]],
        hours       : arr[2]
    }
}






var Day;

Day = Model.extend({
    idAttribute: 'dayOfWeek',
    props: {
        dayOfWeek: 'string'
    },
    derived: {
        code: {
            deps: ['dayOfWeek'],
            fn: function () {
                return vocabulary[this.dayOfWeek];
            }
        }
    },
    collections: {
        hours: HoursCollection
    },
    parse: function (attrs) {
        var options = _.clone(inputOptions, true);

        return parse.call(this, attrs, options);
    }
});

module.exports = Day;




/**
 * Parse
 *
 * @param  {Mixed} attrs
 * @param  {[Object]} options
 * @return {Object}
 */

function parse (attrs, options) {
    var result = _.clone(attrs);

    var queue = typeof options.parse == 'function'
            ? [options.parse]
            : _.clone(options.parse);

    var fn;

    while (fn = queue.shift()) {
        //
        if (typeof fn != 'function')
            break;

        if (attrs = fn(attrs))
            result = _.clone(attrs, true);
        else
            attrs = _.clone(result, true);
    }

    return result;
}
