const mongoose = require('mongoose');

const CssMod = mongoose.Schema({
    property: String, //key for modification
    baselineValue: String,
    triggerValue: String
})

const CssTrig = mongoose.Schema({
    tid : String, //key for trigger
    modifications: [CssMod]
})

const CssExt = mongoose.Schema({
    eid : String, //key for extension
    triggers : {type : [CssTrig], required : false}
});

const CssFp = mongoose.Schema({
    date : {type : Date, default : Date.now},
    extensions : {
        type : [CssExt],
        // required : false
    }
})

const CssFpSchema = mongoose.model('CssFps', CssFp);

module.exports = {CssFp: CssFpSchema};

/*
fingerprint = [{
    eid : "bitwarden",
    triggers : [{
        tid: "1",
        modifications: [{
            property: "animation-duration",
            baselineValue: "0s",
            triggerValue: "0.2s"
        },{
            property: String,
            baselineValue: String,
            triggerValue: String
        }]
    },{
        tid: "2",
        modifications: [{
            property: "animation-name",
            baselineValue: "none",
            triggerValue: "bitwardenfill"
        },{
            property: String,
            baselineValue: String,
            triggerValue: String
        }]
    }]
}, {
    eid : "noscript",
    triggers : []
}]
*/