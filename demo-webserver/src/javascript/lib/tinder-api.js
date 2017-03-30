'use strict';
var editorExtensionId = "daeggjnbehhmfgcggbnnjkejdkfeohpo";

var renderPug = {
	matches : require( '../../components/matches.pug' )
};

var Tinder = {

	Matches: function()
	{
		chrome.runtime.sendMessage(editorExtensionId, {Query: 'Matches'},
		function(response)
		{
			var matchContent = document.getElementById('js-match-content');
			var matchHTML = '';

			console.log( response );

			for ( var i = 0; i < response.results.length; i++ )
			{
				var matchPhotos = [];

				// If i not evenly divisible by 4
				if( (i+1) % 4 === 0 )
				{
					// Close and open a new Row.
					matchHTML += '</div><div class="row">'
				}

				for ( var j = 0; j < response.results[i].photos.length; j++ )
				{
					matchPhotos.push( { imageUrl : response.results[i].photos[j].url, className : j === 0 ? 'active' : '' });
				}

				var data = {
					index : i,
					photos : matchPhotos,
					name : response.results[i].name,
					age : getAge(response.results[i].birth_date),
					distance : response.results[i].distance_mi
				};

				matchHTML += renderPug.matches( data );
			}

			matchContent.innerHTML = matchHTML;
			console.log('Matches: ', response);
		});
	},

	Profile: function()
	{
		chrome.runtime.sendMessage(editorExtensionId, {Query: 'Profile'},
		function(response) {
			console.log('Profile: ', response);
			window.pug = response;
			document.getElementById('js-tinder-name').innerText = response.user.full_name;
			document.getElementById('js-tinder-likes').innerText = response.rating.likes_remaining;
			document.getElementById('js-tinder-super-likes').innerText = response.rating.super_likes.allotment;
		});
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
