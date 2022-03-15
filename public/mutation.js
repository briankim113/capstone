//this file saves all MutationRecords into an array

var records = []; //array of records to which descriptions will be appended

let config = {
    /* childList, attributes, characterData - one of these three should be in the config */
    subtree: true, // track all nodes in the subtree rooted at target
    childList: true, // monitor addition or removal of target nodes
    attributes: true,
    attributeOldValue: true, // track oldValue of attribute changes
    // attributeFilter: ['style'], // specify which attributes to be tracked, e.g. style attribute inside the actual element
    // characterData: false,
    // characterDataOldValue: false
};

function callback(mutationList){
    for (let mutation of mutationList) {
        // console.log(mutation);
        if (mutation.type == 'childList') {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(
                    function(node) {
                        records[records.length] = 'ADD ' + node.outerHTML + ' TO ' + mutation.target.nodeName;
                    //   console.log('ADD\t' + node.outerHTML + '\tTO\t' + mutation.target.nodeName);
                    },
                );
            }
            if (mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach(
                    function(node) {
                        records[records.length] = 'REMOVE ' + node.outerHTML + ' FROM ' + mutation.target.nodeName;
                    //   console.log('REMOVE\t' + node.outerHTML + '\tFROM\t' + mutation.target.nodeName);
                    },
                );
            }
        }
        else if (mutation.type == 'attributes') {
            records[records.length] = 'CHANGE ' + mutation.attributeName + ' AT ' + mutation.target.nodeName + ' FROM ' + mutation.oldValue + ' TO ' + mutation.target.getAttribute(mutation.attributeName);
            // console.log(
            //     'The ' + mutation.attributeName + ' attribute at '
            //     + mutation.target.nodeName + ' was modified from "'
            //     + mutation.oldValue + '" to "'
            //     + mutation.target.getAttribute(mutation.attributeName) + '"'
            // );
        }
    }
    // observer.takeRecords(); //returns the last batch of changes before the callback has been fired
    // observer.disconnect(); //stops tracking changes
}

var container = document.documentElement || document.body;

function callMO(){
    observer = new MutationObserver(callback);
    observer.observe(container, config);
}

document.addEventListener("DOMContentLoaded", callMO()); //start tracking changes as soon as we are done loading the server-provided DOM

// window.addEventListener('load', function() {
//     console.log(records);
// });