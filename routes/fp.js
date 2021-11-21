const express = require('express');
const router = express.Router();
const {Fp} = require('../models/Fp');

//find and return all DomFps
router.get('/', async (req, res) => {
    try {
        const fps = await Fp.find();
        res.json(fps); //show on the page
    }
    catch(err) {
        // console.log(err); //show on server
        res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
});

module.exports = router;