//wrap in window.onload so there is a document.body to add child to
window.onload = function(e){
// document.addEventListener("DOMContentLoaded", function(e) {

    // insert Bitwarden div element

    // <div class='trigger' id='31609'>
    //    <div trigger='no' orig_class='com-bitwarden-browser-animated-fill'></div><div trigger='yes' class='com-bitwarden-browser-animated-fill'></div>
    // </div>
    var elem = document.createElement('div');
    elem.className = "trigger";
    elem.id = "31609";
    elem.innerHTML = "<div trigger='no' orig_class='com-bitwarden-browser-animated-fill'></div><div trigger='yes' class='com-bitwarden-browser-animated-fill'></div>";
    document.body.appendChild(elem);


    // insert NoScript NoSecurity div element

    // <div class='trigger' id='1'>
    //     <div trigger='no' orig_class='__ns__pop2top'></div><div trigger='yes' class='__ns__pop2top'></div>
    // </div>
    var elem1 = document.createElement('div');
    elem1.className = "trigger";
    elem1.id = "1";
    elem1.innerHTML = "<div trigger='no' orig_class='__ns__pop2top'></div><div trigger='yes' class='__ns__pop2top'></div>";
    document.body.appendChild(elem1);
    
    // <div class='trigger' id='2'>
    //     <div trigger='no' orig_class='__ns__pop2top.html5-video-container'></div><div trigger='yes' class='__ns__pop2top.html5-video-container'></div>
    // </div>
    var elem2 = document.createElement('div');
    elem2.className = "trigger";
    elem2.id = "2";
    elem2.innerHTML = "<div trigger='no' orig_class='__ns__pop2top.html5-video-container'></div><div trigger='yes' class='__ns__pop2top.html5-video-container'></div>";
    document.body.appendChild(elem2);

    // <div class='trigger' id='3'>
    //     <div trigger='no' orig_class='__NoScript_PlaceHolder__'></div><div trigger='yes' class='__NoScript_PlaceHolder__'></div>
    // </div>
    var elem3 = document.createElement('div');
    elem3.className = "trigger";
    elem3.id = "3";
    elem3.innerHTML = "<div trigger='no' orig_class='__NoScript_PlaceHolder__'></div><div trigger='yes' class='__NoScript_PlaceHolder__'></div>";
    document.body.appendChild(elem3);
        
}
// )