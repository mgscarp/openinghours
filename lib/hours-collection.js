var _ = require('lodash');

var Collection = require('ampersand-collection');



var Hours = require('./hours-state.js');


var inputOptions = {};


inputOptions.parse = function (attrs) {
    if (typeof attrs != 'string')
        return false;

    var reSplit = /,\s/g;

    return attrs
        .trim()
        .split(reSplit);
}




var HoursCollection;

HoursCollection = Collection.extend({
    model: Hours,
    serialize: function() {
        return this
            .map(function(hours){
                return hours.serialize();
            }).join(' ');
    },
    parse: function (attrs) {
        var options = _.clone(inputOptions, true);

        return parse.call(this, attrs, options);
    }
});


module.exports = HoursCollection;




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

    console.log(options);

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

