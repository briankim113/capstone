const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const {Fp} = require('./models/Fp');

//MIDDLEWARES
//parse JSON
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

//import routes come at the end of middlewares
app.use(express.static('public'));
const fpRoute = require('./routes/fp');
app.use('/fp', fpRoute);


//ROUTES
// app.get('/', (req, res) => {
//     res.send('We are on home')
// });

//submit a CssExt data to database when receiving it via POST
app.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let fp = await new Fp({extensions : req.body});
        console.log(fp);
        fp.save();
        res.sendStatus(200); //good to go
    } catch (err) {
        console.log(err);
        res.sendStatus(400); //bad request
    }
});

//CONNECT TO DB
mongoose.connect(
    'mongodb://localhost:27017/capstone',
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("database connected")
);

//Start to listen to the server
app.listen(PORT, () => console.log('Server listening on port:', PORT));