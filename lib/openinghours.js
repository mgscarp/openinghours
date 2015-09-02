/**
 * Require dependencies
 */

var Collection = require('ampersand-collection');

var Day = require('./day-state.js');



/**
 * Declare
 */

var OpeningHours;


/**
 * Extend ampersand Collection
 */

OpeningHours = Collection.extend({
    mainIndex: 'dayOfWeek',
    model: Day
});


/**
 * Expose `OpeningHours`
 */

module.exports = OpeningHours;
