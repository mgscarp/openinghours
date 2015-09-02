var Model = require('ampersand-state');


var HoursCollection = require('./hours-collection.js');

var Day;

Day = Model.extend({
    idAttribute: 'dayOfWeek',
    props: {
        dayOfWeek: 'string'
    },
    collections: {
        hours: HoursCollection
    }
});

module.exports = Day;
