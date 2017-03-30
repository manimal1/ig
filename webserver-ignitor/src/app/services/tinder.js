'use strict';

const editorExtensionId = "daeggjnbehhmfgcggbnnjkejdkfeohpo";

const Tinder = {
	Matches: () => new Promise( ( resolve, reject ) =>
	{
		chrome.runtime.sendMessage( editorExtensionId, { Query: 'Matches' }, ( response ) =>
		{
			if ( !response || response.status !== 200 )
			{
				reject( response );
				return;
			}

			console.log( 'Matches response' );
			console.log( response );
			resolve ( response.results )
		} );
	}),

	Profile: () => new Promise( ( resolve, reject ) =>
	{
		chrome.runtime.sendMessage( editorExtensionId, { Query: 'Profile' }, ( response ) =>
		{
			if ( !response || response.status !== 200 )
			{
				reject( response );
				return;
			}

			console.log( 'Profile response' );
			console.log( response );
			resolve ( response )
		} );
	} ),

	Test : ( query ) => new Promise( ( resolve, reject ) => {
		chrome.runtime.sendMessage( editorExtensionId, { Query: query }, ( response ) =>
		{
			if ( !response || response.status !== 200 )
			{
				reject( response );
				return;
			}

			resolve ( response )
		} );
	} )
};

export default Tinder;
