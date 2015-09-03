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
        if (typeof attrs == 'string')
            return parseTxt(attrs);

        return attrs;
    }
});

module.exports = Day;


function parseTxt (raw) {
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
