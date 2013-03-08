// 1 min interval
var interval = localStorage["interval"] === undefined ? localStorage["interval"] : 1;
var pollInterval = interval * 1000 * 60;
var fuckAnimation = localStorage["animation"] === undefined ? localStorage["animation"] : true;
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

var cur_rmb=0;
var cur_usd=0;

function update() {
    $.ajax({    
	   url:url,
	   success:function(data){
	       var rmb_text = $('.infobox:nth(0)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	       var usd_text = $('.infobox:nth(1)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	       var rmb = parseInt(rmb_text);
	       var usd = parseInt(usd_text);
	       chrome.browserAction.setTitle({'title':'人民币价格:'+parseFloat(rmb_text)+"  "+'美元价格:'+parseFloat(usd_text)});

	       var badgeColor;
	       if(rmb>cur_rmb) {
		   badgeColor = '#C43E44';
	       } else if(rmb==cur_rmb) {
		   badgeColor = '#78B9FF';
	       } else {
		   badgeColor = '#9C6';
	       }
	       var text = rmb + "";
	       if(fuckAnimation) {
	       	   var animator = new BadgeTextAnimator ( {
	       						      text: text,
	       						      interval: 200, 
	       						      repeat: false, 
	       						      size: text.length, 
							      color: badgeColor 
	       						  } );
	       	   animator.animate ();
	       } else {
	       	   chrome.browserAction.setBadgeText({'text':rmb});
	       };
	       
	       cur_rmb = rmb;
	       cur_usd = usd;

		   
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
