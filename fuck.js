function updateBadge() 
{
  var cur_rmb = $('.infobox:nth(0)  tr:nth(1) td:nth(1)').html().slice(1);
  var cur_usd = $('.infobox:nth(1)  tr:nth(1) td:nth(1)').html().slice(1);
  chrome.browserAction.setBadgeText({text:cur_rmb+"/"+cur_usd});
};

var pollInterval = 60*1000;

function startRequest() {
  updateBadge();
  window.setTimeout(startRequest, pollInterval);
}






