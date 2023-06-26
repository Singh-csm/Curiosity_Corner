const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv').config();

const mongoose = requrie('mongoose');


const route = require('./routes/routes');
app.use('/', route);

app.listen(3000, function () {
    console.log('App is runnig on port' + 3000);
});