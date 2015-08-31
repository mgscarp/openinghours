/**
 * Require additional methods
 */

var utils = require('./utils.js');

/**
 * Expose `OpeningHours`
 */

module.exports = OpeningHours;

/**
 * Expose `sort`
 */

module.exports.sort = utils.sort;

/**
 * OpeningHours module
 *
 * @constructor
 * @param {string} raw
 * @returns {OpeningHours}
 */

function OpeningHours(raw) {
    this.raw = raw;

    return this;
}

