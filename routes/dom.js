const express = require('express');
const router = express.Router();
const {DomFp} = require('../models/Dom');

//find and return all DomFps
router.get('/', async (req, res) => {
    try {
        const domFps = await DomFp.find();
        res.json(domFps); //show on the page
    }
    catch(err) {
        // console.log(err); //show on server
        res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
});

module.exports = router;