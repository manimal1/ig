var Ignitor = {
	tabid: null,
	Init: function(token)
	{
		console.log("Inside Init:", token)
		chrome.tabs.update(Ignitor.tabid, {url: "http://localhost:9090"});
	}
}

//Event Catchers below, these fire core Ignitor logic
//Spoof Useragent for all tinder api requests
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
        	details.requestHeaders[i].value = 'Tinder Android Version 6.7.2';
    	}
    }	
    return {requestHeaders: details.requestHeaders};
}, {urls: ["*://api.gotinder.com/*"]}, ["blocking", "requestHeaders"]);

//Catches the token from content script message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request)
	if (request.token || request.userid)
	{
		Tinder.Authentication(request.token,request.userid);

	}
	else
	{
		console.log("Error passing facebook token and userid: ",request)
	}
});
//Catches the Ignitor icon click
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({"url":"https://www.facebook.com/v2.0/dialog/oauth?response_type=token&display=popup&api_key=464891386855067&redirect_uri=fbconnect%3A%2F%2Fsuccess&scope=user_about_me%2Cuser_activities%2Cuser_education_history%2Cuser_location%2Cuser_photos%2Cuser_relationship_details%2Cuser_status"},
		function(tab){
	    	Ignitor.tabid = tab.id;
	});
});  


