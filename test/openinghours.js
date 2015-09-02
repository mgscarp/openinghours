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
            'opens': '15։00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Tuesday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15։00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Wednesday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15։00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Thursday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15։00',
            'closes': '21:00'
        }],
    }, {
        dayOfWeek: 'Friday',
        hours: [{
            'opens': '10:00',
            'closes': '14:00'
        }, {
            'opens': '15։00',
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

    it('should initialize correctly', function(){
         openinghours = new OpeningHours(data, { parse: true });

         var mondayHours = '10:00-14:00 00:00-21:00';

         assert.deepEqual(openinghours.get('Monday').hours.serialize(), mondayHours);
    });
});
