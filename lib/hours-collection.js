var Collection = require('ampersand-collection');

var Hours = require('./hours-state.js');

var HoursCollection

HoursCollection = Collection.extend({
    model: Hours,
    serialize: function() {
        return this
            .map(function(hours){
                return hours.serialize();
            }).join(' ');
    },
    parse: function (attrs) {
        if (typeof attrs == 'string')
            return parseText(attrs);

        return attrs;
    }
});


module.exports = HoursCollection;

function parseText (attrs) {

    var re = /,\s/g;

    return attrs
        .trim()
        .split(re);
}
