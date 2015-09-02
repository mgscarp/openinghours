var assert = require('assert');

var OpeningHours = require('../lib/openinghours.js');

var data;

data = [
    {
        dayOfWeek: 'Monday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15:00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Tuesday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15:00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Wednesday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15:00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Thursday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15:00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Friday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15:00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Saturday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }]
    }
];

describe('OpeningHours', function() {
    var openinghours;

    it('should exist', function() {
        assert.ok(OpeningHours);
    });

    it('should serialize correctly', function(){
         openinghours = new OpeningHours(data, { parse: true });

         var result = 'Mo-Fr 10:00-14:00 15:00-21:00; Sa 10:00-14:00';

         assert.deepEqual(openinghours.serialize(), result);
    });
});
