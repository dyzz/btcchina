// 1 min interval
var pollInterval = 1;

var url = "https://btcchina.com/";


function updateBadge(x,y) {
  if(x>0 && y>0)
    chrome.browserAction.setBadgeText({text:cur_rmb+"/"+cur_usd});
  else
    chrome.browserAction.setBadgeText({text:"?"});
};

function scheduleRequest() {
  console.log('start query');
  var delay = pollInterval;
  console.log('creating alarm');
  chrome.alarms.create('refresh', {periodInMinutes: delay});
}

function startRequest() {
   scheduleRequest();
  getCurrentPrice();
}



function getCurrentPrice() {
  alert("get price");
  $.ajax({    
	   url:url,
	   success:function(data){
	     var cur_rmb = $('.infobox:nth(0)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	     var cur_usd = $('.infobox:nth(1)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	     updateBadge(cur_rmb,cur_usd);
	   },
	   error:function(err){
	     updateBadge(-1,-1);
	   }
	 }
	);
}


function onInit() {
  console.log('onInit');
  startRequest();
}

function onAlarm(alarm) {
  startRequest();
}



chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);
