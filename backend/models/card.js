const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  item : {type: String, required: true},
  description : {type: String},
  comments: {type: Array},

})

module.exports = cardSchema;
