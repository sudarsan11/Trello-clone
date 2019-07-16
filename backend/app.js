const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const listRoutes = require('./routes/lists');

app.use ((req,res,next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE" );

  next();
})

mongoose
  .connect(
    ""
    , { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
});



app.use('/api/list/', listRoutes);

module.exports = app;
