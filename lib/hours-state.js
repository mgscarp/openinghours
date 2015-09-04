var State = require('ampersand-state');

var moment = require('moment'),
    _      = require('lodash');


var inputOptions = {};


inputOptions.parse = [
    // parse
    function (attrs) {
        if (typeof attrs != 'string')
            return false;

        var reCapture = /([0-9:]+)[\s-]+([0-9:]+)/;

        var arr = attrs.match(reCapture);

        return {
            opens: arr[1],
            closes: arr[2]
        }
    },
    // transform
    function (attrs) {
        var reCheck = /\d{2}:\d{2}/;

        if (!reCheck.test(attrs.opens) || !reCheck.test(attrs.closes))
            return false;

        return _.transform(attrs, function(result, t, key) {
            // convert time to minute of day if string
            result[key] = moment.duration(t).asMinutes();
        });
    }
];



var Hours;

Hours = State.extend({
    props: {
        opens: 'any',
        closes: 'any'
    },
    parse: function (attrs) {
        var options = _.clone(inputOptions, true);

        return parse.call(this, attrs, options);
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
