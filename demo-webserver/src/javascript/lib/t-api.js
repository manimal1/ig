'use strict';

var editorExtensionId = "daeggjnbehhmfgcggbnnjkejdkfeohpo";

var Tinder =
{
	Matches: function()
	{
		chrome.runtime.sendMessage( editorExtensionId, {Query: 'Matches'},
		function(response)
		{
			console.log('t-api Matches: ', response);
		} );
	},

	Profile: function()
	{
		chrome.runtime.sendMessage(editorExtensionId, {Query: 'Profile'},
		function(response) {
			console.log('t-api Profile: ', response);
            document.getElementById('js-tinder-name').innerText = 'Working?';
		});
	}
}

console.log( 't-api: ', Tinder.Profile() );

module.exports =
{
    profile: Tinder.Profile,
    matches: Tinder.Matches
}
