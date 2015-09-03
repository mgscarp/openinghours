var assert = require('assert');

var fs = require('fs');

var OpeningHours = require('../lib/openinghours.js');

var data = {
        sane    : require('./assets/sane.json'),
        longEng : fs.readFileSync(__dirname  + '/assets/long-english.txt', 'utf8')
    };

describe('OpeningHours', function() {
    var openinghours;

    it('should exist', function() {
        assert.ok(OpeningHours);
    });

    it('should serialize correctly', function(){
         openinghours = new OpeningHours(data.sane, { parse: true });

         var result = 'Mo-Fr 10:00-14:00 15:00-21:00; Sa 10:00-14:00';

         assert.deepEqual(openinghours.serialize(), result);
    });
});

describe('Parse', function(){
    var openinghours;

    it('should accept raw test', function () {
         openinghours = new OpeningHours(data.longEng, { parse: true });

         var result = 'Mo-Fr 10:00-14:00 15:00-21:00; Sa 10:00-14:00';

         assert.deepEqual(openinghours.serialize(), result);
    });
});
