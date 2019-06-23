const mongoose = require('mongoose');
const cardSchema = require('./card');

const listSchema = new mongoose.Schema({

  item : {type: String, required: true},
  children : [cardSchema]
})

module.exports = mongoose.model('list', listSchema);
