const mongoose = require('mongoose');

const RecipientSchema = require('./recipient.model');

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  recipients: [RecipientSchema],

  yes: {
    type: Number,
    default: 0,
  },

  no: {
    type: Number,
    default: 0,
  },

  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  dateSent : Date,
  lastResponded : Date
});

mongoose.model('Surveys', surveySchema);
