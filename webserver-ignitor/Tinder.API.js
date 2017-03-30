console.log("Inside Tinder_API.js")

var editorExtensionId = "daeggjnbehhmfgcggbnnjkejdkfeohpo";

var Tinder ={
	token: null,
	GetAPI: function(apiurl)
	{
		var Query =
		{
			type: "Get",
			url: apiurl,
		}
		chrome.runtime.sendMessage(editorExtensionId, Query,
		function(response) {
			return response
		});
	},
	PostAPI: function(apiurl,postdata)
	{
		var Query =
		{
			type: "Post",
			url: apiurl,
			postdata: postdata
		}
		chrome.runtime.sendMessage(editorExtensionId, Query,
		function(response) {
			return response
		});
	},
	PutAPI: function(apiurl)
	{
		var Query =
		{
			type: "Put",
			url: apiurl
		}
		chrome.runtime.sendMessage(editorExtensionId, Query,
		function(response) {
			return response
		});
	},
	Matches: function()
	{
		return Tinder.GetAPI("https://api.gotinder.com/recs/core?locale=en");
	},
	Groups: function()
	{
		return Tinder.GetAPI("https://api.gotinder.com/recs/social?locale=en");
	}
}

Tinder.Group = {
	Like: function(GroupID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/matches/mute/"+GroupID);
	},
	Pass: function(GroupID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/group/pass/"+GroupID);
	},
	SuperLike: function(GroupID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/group/superlike/"+GroupID);
	},
	Info: function(GroupID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/group/"+GroupID);
	},
	FacebookFriends: function()
	{
		return Tinder.GetAPI("https://api.gotinder.com/group/friends")
	},
	Create: function()
	{

	}
}

Tinder.User = {
	Info: function(UserID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/user/"+UserID);
	},
	Like: function(UserID,photoid,content_hash,s_number)
	{
		return Tinder.GetAPI("https://api.gotinder.com/like/"+UserID+"?photoId="+photoid+"&content_hash="+content_hash+"&s_number="+s_number);
	},
	Pass: function(UserID,photoid,content_hash,s_number)
	{
		return Tinder.GetAPI("https://api.gotinder.com/pass/"+UserID+"?photoId="+photoid+"&content_hash="+content_hash+"&s_number="+s_number);
	},
	SuperLike: function(UserID,photoid,content_hash,s_number)
	{
		return Tinder.GetAPI("https://api.gotinder.com/like/"+UserID+"/super?photoId="+photoid+"&s_number="+s_number);
	},
	Report: function(UserID)
	{
		//todo
	},
	Mute: function(UserID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/matches/mute/"+UserID);
	},
	CommonConnections: function(UserID)
	{
		return Tinder.GetAPI("https://api.gotinder.com/user/"+UserID+"/common_connections")
	}
}

Tinder.Profile = {
	SendLocation: function()
	{
		//todo
	},
	Updates: function()
	{
		//todo
	},
	Spotify: function()
	{
		return Tinder.GetAPI("https://api.gotinder.com/v2/profile?include=spotify")
	},
	Boost: function()
	{
		//todo
	},
	StartBoost: function()
	{
		//todo
	},
	ChangeLocation: function()
	{
		//todo
	},
	ResetLocation: function()
	{
		//todo
	},
	SetUsername: function()
	{
		//todo
	},
	Info: function()
	{
		return Tinder.GetAPI("https://api.gotinder.com/meta");
	}
}
