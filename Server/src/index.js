const express = require('express');
const multer = require("multer");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(multer().any());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

const dotenv = require('dotenv').config();

const mongoose = requrie('mongoose');


const route = require('./routes/routes');
app.use('/', route);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });