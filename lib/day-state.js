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
    }
});

module.exports = Day;
