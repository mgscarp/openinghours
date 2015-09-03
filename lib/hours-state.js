var State = require('ampersand-state');

var moment = require('moment'),
    _      = require('lodash');


var options = {};

options.parse = function (attrs) {
    if (typeof attrs != 'string')
        return false;

    var reCapture = /([0-9:]+)[\s-]+([0-9:]+)/;

    var arr = attrs.match(reCapture);

    return {
        opens: arr[1],
        closes: arr[2]
    }
}

options.transform = function (attrs) {
    var reCheck = /\d{2}:\d{2}/;

    if (!reCheck.test(attrs.opens) || !reCheck.test(attrs.closes))
        return false;

    return _.transform(attrs, function(result, t, key) {
        // convert time to minute of day if string
        result[key] = moment.duration(t).asMinutes();
    });
}



var Hours;

Hours = State.extend({
    props: {
        opens: 'any',
        closes: 'any'
    },
    parse: function(attrs) {
        var result = _.clone(attrs);

        var queue = [], fn;

        queue.push(options.parse, options.transform);

        while (fn = queue.shift()) {
            if (typeof fn != 'function')
                break;

            if (attrs = fn(attrs))
                result = _.clone(attrs, true);
            else
                attrs = _.clone(result, true);
        }

        return result;
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

function parseText (attrs) {

}

