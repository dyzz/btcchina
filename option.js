var select = document.getElementById("config");
select.interval.value = localStorage["interval"] === undefined ? 1 : localStorage["interval"] ;
select.animation.checked = localStorage["animation"] === undefined ? true : localStorage["animation"];

function save_options() {
    var interval = select.interval.value;
    var animation = select.animation.checked;
    localStorage["interval"] = interval;
    localStorage["animation"] = animation;

    var status = document.getElementById("status");
    status.innerHTML = "设置已保存";
    setTimeout(function() {
    		   status.innerHTML = "";
    	       }, 1000);
}



document.querySelector('#save').addEventListener('click', save_options);