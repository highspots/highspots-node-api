const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighSessionSchema = new Schema({
    name: {type: String}
  });
  
mongoose.model('HighSession', HighSessionSchema); //defining model

const HighSession = require('mongoose').model('HighSession'); //getting model

module.exports = HighSession;