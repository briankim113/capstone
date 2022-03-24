window.addEventListener('load', function() {
    // console.log(window.navigator.userAgent);
    // console.log(records); //from mutation.js
    // console.log(extensions); //from fingerprint.js

    var data = {};
    data["USERAGENT"] = window.navigator.userAgent; //fetch browser and OS information
    data["RECORDS"] = records;
    data["EXTENSIONS"] = extensions;
    // console.log(data);

    var xhr = new XMLHttpRequest();
    // var url = "http://localhost:3000/"; //default localhost url
    var url = "http://10.230.240.222:3000/"; //server url
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
});