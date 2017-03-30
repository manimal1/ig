'use strict';

const editorExtensionId = "daeggjnbehhmfgcggbnnjkejdkfeohpo";

const Tinder = {

  Matches: () => new Promise( ( resolve, reject ) =>
  {
    chrome.runtime.sendMessage( editorExtensionId, { Query: 'Matches' }, ( response ) =>
    {
      if ( !response || !response || response.status !== 200 )
      {
        reject( response );
        return;
      }

      console.log( 'response' );
      console.log( response );
      resolve ( response.results )
    } );
  } ),

	Profile: function()
	{
    chrome.runtime.sendMessage( editorExtensionId, { Query: 'Profile' },
      function( response ) {
        console.log( 'Profile: ', response );
      }
    );
  }
};

/**
 * Util to get a user's age
 * @param birthday
 * @returns {number}
 */
function getAge( birthday ) {
	var birthDate = Date.parse( birthday );
	var ageDifMs = Date.now() - birthDate;
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = Tinder;
