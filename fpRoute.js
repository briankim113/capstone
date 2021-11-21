const express = require('express');
const router = express.Router();
const FpModel = require('./fpModel');

//find and return all DomFps
router.get('/', async (req, res) => {
    try {
        const fps = await FpModel.find();
        res.json(fps); //show on the page
    }
    catch(err) {
        // console.log(err); //show on server
        res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
});

module.exports = router;