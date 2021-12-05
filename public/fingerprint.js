function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

var ext_trigger_id_mappings = {
    "bitwarden": ["31609","49960","49961","49962"],
    "adguardadblocker": ["28913","28914","28915","28916","28917","28918","28919","28920","28921","28922","28923","28924","28925","28926","28927"],
    "noscriptsecuritysuite": ["1","2","3"],
    "leechblock": ["11","12","13","14","15"]
};

var eid_ptag_mappings = {
    "bitwarden": "p4",
    "adguardadblocker": "p5",
    "noscriptsecuritysuite": "p6",
    "leechblock": "p7"
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
    // console.log(modifications);
    return modifications;
}

function getDimensionJSON(element) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y
    };
  }

var extensions = {};

document.addEventListener("DOMContentLoaded", function(e) {
    /*
    CSS fingerprinting
    */
    var ts = document.getElementsByClassName('trigger');
    var identifiedTriggers = {};

    // for all the triggers
    for (var i=0; i<ts.length; i++) {
        var tid = ts[i].getAttribute("id");
        var t = ts[i].querySelector("[trigger='yes']");
        var b = ts[i].querySelector("[trigger='no']");

        // get all the observed modifications for this trigger
        var modifications = detectedGCS(t, b);
        if (!isEmpty(modifications)) {
            identifiedTriggers[tid] = modifications;
        }
    }

    // now map this trigger to an extension
    for (let eid in ext_trigger_id_mappings) {
        var possible_tids = ext_trigger_id_mappings[eid];
        for (tid in identifiedTriggers){
            if (possible_tids.includes(tid)) {
                if (isEmpty(extensions[eid])) {
                    extensions[eid] = {};
                }
                extensions[eid][tid] = identifiedTriggers[tid];
            }
        }
    }

    // console.log(extensions); //excluding DOM

    /*
    DOM fingerprinting
    */
    let ghosteryElem = document.getElementById("ghostery-tracker-tally");
    if (ghosteryElem != null) {
        console.log(ghosteryElem);
        
        // dimensions
        extensions["ghostery"] = getDimensionJSON(ghosteryElem);
        
        // extensions["ghostery"] = {
        //     clientHeight : ghosteryElem.clientHeight,
        //     clientLeft : ghosteryElem.clientLeft, //always 0
        //     clientTop : ghosteryElem.clientTop, //always 0
        //     clientWidth : ghosteryElem.clientWidth,

        //     offsetHeight : ghosteryElem.offsetHeight,
        //     offsetLeft : ghosteryElem.offsetLeft,
        //     offsetTop : ghosteryElem.offsetTop,
        //     offsetWidth : ghosteryElem.offsetWidth,

        //     scrollHeight : ghosteryElem.scrollHeight,
        //     scrollLeft : ghosteryElem.scrollLeft, //always 0
        //     scrollTop : ghosteryElem.scrollTop, //always 0
        //     scrollWidth : ghosteryElem.scrollWidth
        // };

        // other attributes to add - NamedNodeMap
        let attributes = ghosteryElem.attributes;
        console.log(attributes);
        for (var i=0; i<attributes.length; i++){
            let item = attributes.item(i);
            extensions["ghostery"][item.name] = item.value;
        }
    }
    else {
        console.log("Ghostery not detected");
    }

    //Dark Reader meta tag
    let darkReaderMeta = document.querySelector('meta[name="darkreader"]')
    if (darkReaderMeta != null) {
        console.log(darkReaderMeta);

        //dimensions - don't seem useful but still good for initialization and consistency
        extensions["darkReader"] = getDimensionJSON(darkReaderMeta);

        // other attributes to add - NamedNodeMap
        let attributes = darkReaderMeta.attributes;
        console.log(attributes);
        for (var i=0; i<attributes.length; i++){
            let item = attributes.item(i);
            extensions["darkReader"][item.name] = item.value;
        }
    }
    else {
        console.log("Dark Reader not detected");
    }

    // console.log(extensions); //including DOM

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/"; //default localhost url
    // var url = "http://10.21.54.204:3000/"; //laptop url
    // var url = "http://10.230.240.222:3000/"; //server url
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(extensions);
    xhr.send(data);
});
