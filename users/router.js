'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.sendFile('/home/adam/Desktop/thinkful/node/capstone/new/public/index.html');
    });


module.exports = {router};
