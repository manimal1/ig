//Kept for debugging
console.log("api_callhandler.js")

// var Tinder_API = {
//   "Matches": [true,true,true],
//   "Profile": [true,true,true]
// }

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    switch(request.Query) {
      case "Matches":
        console.log("Matches");
        Tinder.Matches()
          .then( function(results){
            sendResponse(results);
        });
      break;
      case "Profile":
        Tinder.Profile.Info()
          .then( function(results){
            sendResponse(results);
          });
      break;
      case "Groups":
        Tinder.Profile()
        .then( function(results){
          sendResponse(results);
        });
      break;
      case "Like":
        Tinder.User.Like(request.UserID,request.photoid,request.content_hash,request.s_number)
          .then(function(results){
            sendResponse(results)
          });
      break;
      case "Pass":
        Tinder.User.Pass(request.UserID,request.photoid,request.content_hash,request.s_number)
          .then(function(results){
            sendResponse(results)
          });
      break;
      case "SuperLike":
        Tinder.User.SuperLike(request.TinderID,request.photoid,request.s_number)
          .then(function(results){
            sendResponse(results)
          });
      break;
      case "User Info":
        Tinder.User.info(request.TinderID)
          .then(function(results){
            sendResponse(results)
          });
      break;
      case "Common Connections":
        Tinder.User.CommonConnections(request.TinderID)
          .then(function(results){
            sendResponse(results)
          });
      break;
      default:
        console.log("Unknown API Call: ", request.Query);
    }
    return true;
 });

