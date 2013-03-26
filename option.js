var select = document.getElementById("config");
select.interval.value = localStorage["interval"] === undefined ? 1 : localStorage["interval"] ;
// select.animation.checked = localStorage["animation"] === undefined ? true : localStorage["animation"];
select.watch_type.value = localStorage["watch_type"] === undefined ? "lt" : localStorage["watch_type"];
select.watch_price.value = localStorage["watch_price"] === undefined ? 300 : localStorage["watch_price"];

function save_options() {
    var interval = select.interval.value;
    // var animation = select.animation.checked;
    var watch_type = select.watch_type.value;
    var watch_price = select.watch_price.value;
    localStorage["interval"] = interval;
    // localStorage["animation"] = animation;
    localStorage["watch_type"] = watch_type;
    localStorage["watch_price"] = watch_price;

    var status = document.getElementById("status");
    status.innerHTML = "设置已保存";
    setTimeout(function() {
    		   status.innerHTML = "";
    	       }, 1000);
}

document.querySelector('#save').addEventListener('click', save_options);