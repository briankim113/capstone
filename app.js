const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const {CssFp} = require('./models/Css');
const {DomFp} = require('./models/Dom');

//MIDDLEWARES
//parse JSON
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

//import routes come at the end of middlewares
app.use(express.static('public'));
const cssRoute = require('./routes/css');
const domRoute = require('./routes/dom');
app.use('/css', cssRoute);
app.use('/dom', domRoute);


//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home')
});

//submit a CssExt data to database when receiving it via POST
app.post('/', async (req, res) => {
    try {
        // let cssFp = await new CssFp({extensions : req.body});
        // console.log(cssFp); //on server
        // cssFp.save();
        let domFp = await new DomFp({extensions : req.body});
        console.log(domFp); //on server
        domFp.save();
    } catch (err) {
        console.log(err);
    }
});

//CONNECT TO DB
mongoose.connect(
    'mongodb://localhost:27017/rest',
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("database connected")
);

//Start to listen to the server
app.listen(PORT, () => console.log('Server listening on port:', PORT));