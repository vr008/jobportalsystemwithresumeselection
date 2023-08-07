const mongoose = require('mongoose');

const finalSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const final = mongoose.model('final', finalSchema);

module.exports = final;
