var Collection = require('ampersand-collection');

var Hours = require('./hours-state.js');

module.exports = Collection.extend({
    model: Hours,
    serialize: function() {
        return this
            .map(function(hours){
                return hours.serialize();
            }).join(' ');
    }
});
