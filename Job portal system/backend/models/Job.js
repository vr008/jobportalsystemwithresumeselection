const mongoose = require('mongoose');
const { GridFSBucket, ObjectID } = require('mongodb');
const jobSchema = new mongoose.Schema({
  jobType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  
  about:{
    type: String,
    required: true
  },
  jobdescription:{
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  responsiblity: {
    type: String,
    required: true
  },

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
