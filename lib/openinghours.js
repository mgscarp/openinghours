/**
 * Require dependencies
 */

var Collection = require('ampersand-collection');

var Day = require('./day-state.js');



/**
 * Declare
 */

var OpeningHours;


/**
 * Extend ampersand Collection
 */

OpeningHours = Collection.extend({
    mainIndex: 'dayOfWeek',
    model: Day,
    serialize: function() {
        var res = {},
            fes = [];

        this.reduce(function(o, day){
            var code    = day.code,
                hours   = day.get('hours').serialize();

            if (o[hours])
                o[hours].push(code);
            else
                o[hours] = [code];

            return o;
        }, res);

        return Object.keys(res)
            .reduce(function(o, hours){
                var days = res[hours],
                    txt  = zip(days) + ' ' + hours;

                o.push(txt);

                return o;
            }, []).join('; ');
    }
});


/**
 * Expose `OpeningHours`
 */

module.exports = OpeningHours;



function zip(days) {
    var order = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    var result = [];

    var current = 0,
        i = 0,
        next, delta;

    // break array to sequentive lists
    do {
        delta = order.indexOf(days[current]) - current;

        var arr = [];

        do {
            arr.push(days[current + i]);
            next = current + i++;
        } while (days[++next] && days[next] == order[next + delta]);

        current = next;

        result.push(arr);

    } while (days[current])


    return result.reduce(function(res, arr){
        var str;

        switch (arr.length) {
            case 1:
            case 2:
                str = arr.join();
                break;
            default:
                str = arr.shift() + '-' + arr.pop();
        }

        res.push(str);

        return res;
    }, []).join(',');
}
