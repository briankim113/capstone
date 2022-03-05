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

    // if (!isEmpty(modifications))
    //     console.log(modifications);

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
        if (!isEmpty(modifications)) {
            identifiedElems[elemid] = modifications;
        }
    }
    // console.log(identifiedElems);

    // now map the identifiedElems to their respective extensions
    for (let extid in extid_to_elemid) { //extid is the key to extid_to_elemid json
        
        // possibly identified elements for every extension
        var possibleElems = extid_to_elemid[extid];
        // console.log(extid, possibleElems);

        for (const elemid of possibleElems) { //pelemid is the element to possibleElems array
            if (identifiedElems.hasOwnProperty(elemid)) { // actually identified
                if (isEmpty(extensions[extid])) { // first identified element for extension
                    extensions[extid] = {}; // create new key-object
                }
                extensions[extid][elemid] = identifiedElems[elemid]; // save info
            }
        }
    }

    // console.log("cssFP() done");
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

// function domFP(){
//     let ghosteryElem = document.getElementById("ghostery-tracker-tally");
//     if (ghosteryElem != null) {
//         // console.log(ghosteryElem);
        
//         // dimensions
//         extensions["ghostery"] = getDimensionJSON(ghosteryElem);

//         // other attributes to add - NamedNodeMap
//         let attributes = ghosteryElem.attributes;
//         // console.log(attributes);
//         for (var i=0; i<attributes.length; i++){
//             let item = attributes.item(i);
//             extensions["ghostery"][item.name] = item.value;
//         }
//     }
//     // else {
//     //     console.log("Ghostery not detected");
//     // }

//     //Dark Reader meta tag
//     let darkReaderMeta = document.querySelector('meta[name="darkreader"]')
//     if (darkReaderMeta != null) {
//         // console.log(darkReaderMeta);

//         //dimensions - don't seem useful for DarkReader specifically but still good for initialization and consistency
//         extensions["darkReader"] = getDimensionJSON(darkReaderMeta);

//         // other attributes to add - NamedNodeMap
//         let attributes = darkReaderMeta.attributes;
//         // console.log(attributes);
//         for (var i=0; i<attributes.length; i++){
//             let item = attributes.item(i);
//             extensions["darkReader"][item.name] = item.value;
//         }
//     }
//     // else {
//     //     console.log("Dark Reader not detected");
//     // }
// }

window.onload = function() {
    cssFP();
    // domFP();

    console.log(extensions);

    var xhr = new XMLHttpRequest();
    // var url = "http://localhost:3000/"; //default localhost url
    var url = "http://10.230.240.222:3000/"; //server url
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(extensions);
    xhr.send(data);
}