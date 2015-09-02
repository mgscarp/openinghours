# OpeningHours

The opening hours model for a business.

### Check:
- <https://schema.org/openingHours>
- <https://schema.org/OpeningHoursSpecification>

## Installation

```sh
$ npm install mgscarp-openinghours --save
```

## Usage

~~~js
var OpeningHours = require('mgscarp-openinghours');

var data = [{
        dayOfWeek: 'Monday',
        hours: [{
            opens: '15:00',
            closes: '21:00'
        }]
    }, {
        dayOfWeek: 'Monday',
        hours: [{
            opens: '15:00',
            closes: '21:00'
        }]
    }];

var hours = new OpeningHours(data);

// returns 'Mo,Tu 15:00-21:00'
hours.serialize(); 
~~~

## Tests

Run tests with Mocha

~~~sh
$ make test
~~~

