//this file maps all CSS modifications made to their respective extensions and saves it in a {extension: [modifications]} JSON

var extensions = {};

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function detectedGCS(t, b) {
    let styleT = window.getComputedStyle(t);
    let styleB = window.getComputedStyle(b);

    //diffPropertyValues is an array of JSON object CssMod that contain all style changes for this given trigger
    var modifications = {};

    for (let property of styleT) {
        if (styleT.getPropertyValue(property) != styleB.getPropertyValue(property)) {
            modifications[property] = {
                "baselineValue" : styleB.getPropertyValue(property),
                "triggerValue" : styleT.getPropertyValue(property)
            };
        }
    }

    return modifications;
}

function cssFP(){
    //get the modified elements
    var elems = document.getElementsByClassName('trigger');
    var identifiedElems = {};
    for (var i = 0; i < elems.length; i++) {
        var elemid = elems[i].getAttribute("id");
        var t = elems[i].querySelector("[trigger='yes']"); //trigger
        var b = elems[i].querySelector("[trigger='no']"); //baseline

        // get all the observed modifications for this element pair
        var modifications = detectedGCS(t, b);
        if (!isEmpty(modifications)) { //only append if there are actual modifications
            identifiedElems[elemid] = modifications;
        }
    }

    // now map the identifiedElems to their respective extensions
    for (let extid in extid_to_elemid) { //extid is the key to extid_to_elemid json
        
        // possibly identified elements for every extension
        var possibleElems = extid_to_elemid[extid];

        for (const elemid of possibleElems) { //pelemid is the element to possibleElems array
            if (identifiedElems.hasOwnProperty(elemid)) { // actually identified
                if (isEmpty(extensions[extid])) { // first identified element for extension
                    extensions[extid] = {}; // create new key-object
                }
                extensions[extid][elemid] = identifiedElems[elemid]; // save info
            }
        }
    }
}

window.addEventListener('load', function() {
    cssFP(); //start cssFP() at load event
    console.log(extensions);

    // if (!isEmpty(extensions)){
    //     var xhr = new XMLHttpRequest();
    //     // var url = "http://localhost:3000/"; //default localhost url
    //     var url = "http://10.230.240.222:3000/"; //server url
    //     xhr.open("POST", url, true);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     var data = JSON.stringify(extensions);
    //     xhr.send(data);
    // }
});