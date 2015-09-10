var State = require('ampersand-state');

var moment = require('moment'),
    _      = require('lodash');


var VOCABULARY = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

var Hours;

Hours = State.extend({
    props: {
        from    : 'number',
        to      : 'number'
    },
    derived: {
        dayOfWeek: {
            deps: ['from'],
            fn: function() {
                var d = Math.floor(this.from / 1440);
                return VOCABULARY[d];
            }
        },
        opens: {
            deps: ['from'],
            fn: function() {
                return toTime(this.from % 1440);
            }
        },
        closes: {
            deps: ['to'],
            fn: function() {
                return toTime(this.to % 1440);
            }
        }
    },
    parse: function (attrs) {
        if (Array.isArray(attrs))
            return {
                from: attrs[0],
                to  : attrs[1]
            };

        var offset = VOCABULARY.indexOf(attrs.dayOfWeek)  * 1440;

        return {
            from: offset + toMinutes(attrs.opens),
            to: offset + toMinutes(attrs.closes)
        };
    },
    serialize: function() {
        return this.getAttributes({ derived: true });
    }
});


module.exports = Hours;


function toTime (t) {
    return moment()
        .startOf('day')
        .minutes(t)
        .format('HH:mm');
}

function toMinutes (t) {
    return moment.duration(t)
        .asMinutes();
}
