'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AudioFileSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the audio file'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  File: {
    type: Buffer
  }
});

module.exports = mongoose.model('AudioFiles', AudioFileSchema);