// load options
var interval = localStorage["interval"] === undefined ? 1 : localStorage["interval"] ;
var pollInterval = interval * 1000 * 60;
// var doTextAnimation = localStorage["animation"] === undefined ? true : localStorage["animation"] ;
var doTextAnimation = true;
var url = "https://btcchina.com/";

// cur rmb and usd price
var cur_rmb=0;
var cur_usd=0;

// badge icon animation
var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');
var gfx = document.getElementById('gfx');
var rotation = 1;
var factor = 1;
var animTimer;
var loopTimer;
var animDelay = 10;

function startAnimate() {
    stopAnimateLoop();
    animTimer = setInterval(iconAnimation, animDelay);
    setTimeout(stopAnimate, 2000);
    loopTimer = setTimeout(startAnimate, 10000);
}

function stopAnimate() {
    if (animTimer != null) {
	clearTimeout(animTimer);
    }      
    chrome.browserAction.setIcon({ path: "icon.png" });
    rotation = 1;
    factor = 1;
}

function stopAnimateLoop() {
   if (loopTimer != null) {
      clearTimeout(loopTimer);
   }
   stopAnimate();
}

function iconAnimation() {
   canvasContext.save();
   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
   canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
   canvasContext.rotate(rotation * 2 * Math.PI);
   canvasContext.drawImage(gfx, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2));
   canvasContext.restore();

   rotation += 0.01 * factor;

   if (rotation <= 0.9 && factor < 0)
      factor = 1;
   else if (rotation >= 1.1 && factor > 0)
      factor = -1;

   chrome.browserAction.setIcon({
      imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)
   });
}

// get price and update badge
function update() {
    $.ajax({    
	   url:url,
	   success:function(data){
	       // var rmb_text = $('.infobox:nth(0)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	       // var usd_text = $('.infobox:nth(1)  tr:nth(1) td:nth(1)',$(data)).html().slice(1);
	       // rmb_text = rmb_text.replace(",","");
	       // usd_text = usd_text.replace(",","");
	       var rmb_text = $('.last_price :first-child',$(data)).text().slice(1);
	       rmb_text = rmb_text.replace(",","");
	       var rmb = parseInt(rmb_text);
	       // var usd = parseInt(usd_text);
	       chrome.browserAction.setTitle({'title':'人民币价格:'+parseFloat(rmb_text)});

	       var badgeColor;
	       if(rmb>cur_rmb) {
		   badgeColor = '#C43E44';
	       } else if(rmb==cur_rmb) {
		   badgeColor = '#78B9FF';
	       } else {
		   badgeColor = '#9C6';
	       }
	       var text = rmb + "";
	       if(doTextAnimation) {
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
	       
	       var watch_price = parseInt(localStorage["watch_price"]);
	       var watch_type = localStorage["watch_type"];

	       stopAnimateLoop();

	       if( (watch_type == "lt" && rmb < watch_price ) ||
		   (watch_type == "gt" && rmb > watch_price )
		 ) {
		     startAnimate() ;
		 } 

	       
	       cur_rmb = rmb;
	       // cur_usd = usd;

		   
	   },
	   error:function(err){
	       chrome.browserAction.setBadgeText({'text':"?"});
	   }
	 }
	);
}


// set timer with update()
setInterval(update,pollInterval);
update();
