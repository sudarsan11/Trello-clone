const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  item : {type: String},
  description : {type: String},
  comments: {type: Array},

})

module.exports = cardSchema;
