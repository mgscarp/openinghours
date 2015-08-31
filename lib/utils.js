/**
 * Sorted days of week
 */

var WEEKDAYS = 'Mo,Tu,We,Th,Fr,Sa,Su'.split(',');


/**
 * Custom sort function
 *
 * @param  {string} a
 * @param  {string} b
 * @return {number}
 */

module.exports.sort = function(a, b) {
    return WEEKDAYS.indexOf(a) - WEEKDAYS.indexOf(b);
};
