var State = require('ampersand-state');

var moment = require('moment'),
    _      = require('lodash');


var Hours;

Hours = State.extend({
    props: {
        opens: 'any',
        closes: 'any'
    },
    parse: function(attrs) {
        return _.transform(attrs, function(result, t, key){
            if (typeof t == 'number')
                return result[key] = t;
            // convert time to minute of day if string
            result[key] = moment.duration(t).asMinutes();
        });
    },
    serialize: function() {
        var attrs = this.getAttributes({ props: true });

        return _.values(attrs)
            .map(function(t){
                return moment()
                    .startOf('day')
                    .minutes(t)
                    .format('HH:mm');
            }).join('-');
    }
});

module.exports = Hours;
