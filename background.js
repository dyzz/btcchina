// 1 min interval
var pollInterval = 5*60*1000;

var url = "https://btcchina.com/";

// function scheduleRequest() {
//   console.log('start query');
//   var delay = pollInterval;
//   console.log('creating alarm');
//   chrome.alarms.create('refresh', {periodInMinutes: delay});
// }

// function startRequest() {
//    scheduleRequest();
//   getCurrentPrice();
// }



function update() {
  $.ajax({    
	   url:url,
	   success:function(data){
	       var cur_rmb = $('.infobox:nth(0)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	       var cur_usd = $('.infobox:nth(1)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	       // chrome.browserAction.setBadgeText({'text':cur_rmb+"/"+cur_usd});
	       chrome.browserAction.setBadgeText({'text':parseInt(cur_rmb)+""});
	   },
	   error:function(err){
	       chrome.browserAction.setBadgeText({'text':"?"});
	   }
	 }
	);
}

setInterval(update,pollInterval);
update();


// function onInit() {
//   console.log('onInit');
//   startRequest();
// }

// function onAlarm(alarm) {
//   startRequest();
// }



// chrome.runtime.onInstalled.addListener(onInit);
// chrome.alarms.onAlarm.addListener(onAlarm);
