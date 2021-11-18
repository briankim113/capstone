const express = require('express');
const router = express.Router();
const {CssFp} = require('../models/Css');

//find and return all CssFps
router.get('/', async (req, res) => {
    try {
        const cssFps = await CssFp.find();
        res.json(cssFps); //show on the page
    }
    catch(err) {
        // console.log(err); //show on server
        res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
});

module.exports = router;