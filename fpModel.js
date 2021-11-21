const mongoose = require('mongoose');

// const CssMod = mongoose.Schema({
//     property: String, //key for modification
//     baselineValue: String,
//     triggerValue: String
// })

// const CssTrig = mongoose.Schema({
//     tid : String, //key for trigger
//     modifications: [CssMod]
// })

// const CssExt = mongoose.Schema({
//     eid : String, //key for extension
//     triggers : [CssTrig]
// });

// const CssFp = mongoose.Schema({
//     extensions : [CssExt]
// })

// const DomExt = mongoose.Schema({
//     eid : String, //key for extension
//     properties : Object
// });

// const DomFp = mongoose.Schema({
//     extensions : [DomExt]
// })

// const Ext = mongoose.Schema({
//     eid : String,
//     triggers : [Object],
//     properties : Object
// })

const Fp = mongoose.Schema({
    date : {type : Date, default : Date.now},
    extensions : Object
})

const FpModel = mongoose.model('fps', Fp);
module.exports = FpModel;

/*
desired document

{
    "_id":"619abb233f43f2a241565384",
    "extensions": {
        "leechblock" : {
            "11" : {
                "background-color" : {
                    "baselineValue": "rgba(0, 0, 0, 0)",
                    "triggerValue": "rgb(255, 255, 255)"
                },
                "border-block-end-color" : {
                    "baselineValue": "rgb(232, 230, 227)",
                    "triggerValue": "rgb(0, 0, 0)"
                }
            },
            "13" : {
                "background-color" : {
                    "baselineValue": "rgba(0, 0, 0, 0)",
                    "triggerValue": "rgb(255, 255, 255)"
                }
            }
        },
        "ghostery" : {
            "id": "ghostery-tracker-tally",
            "clientHeight": 56,
            "clientWidth": 160,
            "offsetHeight": 56,
            "offsetLeft": 758,
            "offsetTop": 737,
            "offsetWidth": 160,
            "scrollHeight": 56,
            "scrollWidth": 160
        }
        "darkreader" : {
            "name": "darkreader",
            "content": "e89e5c900c794250a2b4d324efde2bcf"
        }
    }
},
*/