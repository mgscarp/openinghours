var State = require('ampersand-state');

var Hours;

Hours = State.extend({
    props: {
        opens: 'any',
        closes: 'any'
    },
});

module.exports = Hours;
