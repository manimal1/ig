const jQuery = require( 'jquery' );

window.$ =	jQuery;
window.jQuery = jQuery;
window.Tinder = require( './lib/tinder-api');

require( './lib/page-build');
require( 'bootstrap' );

Tinder.Profile();
Tinder.Matches();
