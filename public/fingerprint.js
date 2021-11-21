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
    var modifications = [];

    for (let property of styleT) {
        if (styleT.getPropertyValue(property) != styleB.getPropertyValue(property)) {
            modifications.push({
                "property": property,
                "baselineValue" : styleB.getPropertyValue(property),
                "triggerValue" : styleT.getPropertyValue(property)
            });
        }
    }
    // console.log(modifications);
    return modifications;
}

// var DOMextensions = []; //array of JSON object DomExt
// var CSSextensions = []; //array of JSON object CssExt
var extensions = [];

document.addEventListener("DOMContentLoaded", function(e) {
    /*
    CSS fingerprinting
    */
    var ts = document.getElementsByClassName('trigger');
    var identifiedTriggers = []; //array of all identified trigger JSON object

    // for all the triggers
    for (var i=0; i<ts.length; i++) {
        var tid = ts[i].getAttribute("id");
        var t = ts[i].querySelector("[trigger='yes']");
        var b = ts[i].querySelector("[trigger='no']");
        
        // get all the observed modifications for this trigger
        var modifications = detectedGCS(t, b);
        if (modifications.length != 0) {
            identifiedTriggers.push({
                "tid" : tid,
                "modifications" : modifications
            });
        }
    }

    // console.log(identifiedTriggers);

    for (let eid in ext_trigger_id_mappings) {
        extensions.push({
            "eid" : eid,
            "triggers" : []
        });
    };

    // now map this trigger to an extension
    for (let eid in ext_trigger_id_mappings) {
        var ext;

        for (var i=0; i<extensions.length; i++){
            if (extensions[i]["eid"] == eid)
                ext = extensions[i];
        }
        // console.log(ext);
        var possible_tids = ext_trigger_id_mappings[eid];
        
        for (var t=0; t<identifiedTriggers.length; t++){
            var trigger = identifiedTriggers[t];
            if (possible_tids.includes(trigger.tid)) {
                ext["triggers"].push(trigger);
            }
        }
    }

    /*
    DOM fingerprinting
    */
    let ghosteryElem = document.getElementById("ghostery-tracker-tally");
    if (ghosteryElem != null) {
        var ghostery = {eid : "ghostery", properties : {}};
        ghostery.properties = {
            id: ghosteryElem.id,
            clientHeight : ghosteryElem.clientHeight,
            // clientLeft : ghosteryElem.clientLeft, //always 0
            // clientTop : ghosteryElem.clientTop,
            clientWidth : ghosteryElem.clientWidth,

            offsetHeight : ghosteryElem.offsetHeight,
            offsetLeft : ghosteryElem.offsetLeft,
            offsetTop : ghosteryElem.offsetTop,
            offsetWidth : ghosteryElem.offsetWidth,

            scrollHeight : ghosteryElem.scrollHeight,
            // scrollLeft : ghosteryElem.scrollLeft, //always 0
            // scrollLeftMax : ghosteryElem.scrollLeftMax,
            // scrollTop : ghosteryElem.scrollTop,
            // scrollTopMax : ghosteryElem.scrollTopMax,
            scrollWidth : ghosteryElem.scrollWidth
        };
        // DOMextensions.push(ghostery);
        extensions.push(ghostery);
    }
    else {
        console.log("Ghostery not detected");
    }

    //Dark Reader meta tag
    let darkReaderMeta = document.querySelector('meta[name="darkreader"]')
    if (darkReaderMeta != null) {
        var darkReader = {eid : "darkreader", properties : {}};
        darkReader.properties = {
            name: darkReaderMeta.name,
            content : darkReaderMeta.content
        };
        // DOMextensions.push(darkReader);
        extensions.push(darkReader);
    }
    else {
        console.log("Dark Reader not detected");
    }

    // console.log(CSSextensions);
    // console.log(DOMextensions);
    // console.log(extensions);
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/"; //change url based on ip_address
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(extensions);
    xhr.send(data);
});