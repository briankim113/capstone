const mongoose = require('mongoose');

const DomExt = mongoose.Schema({
    eid : String, //key for extension
    properties : {type : Object, required : false}
});

const DomFp = mongoose.Schema({
    date : {type : Date, default : Date.now},
    extensions : {
        type : [DomExt],
        // required : false
    }
})

const DomFpSchema = mongoose.model('DomFps', DomFp);
module.exports = {DomFp: DomFpSchema};

/*
fingerprint = [{
    eid : "ghostery",
    properties : {
        clientHeight: 36,
        clientWidth: 35
    }
}, {
    eid : "darkreader",
    properties : {
        content : "asadfklj;qewklr",
        name : "darkreader"
    }
}]
*/