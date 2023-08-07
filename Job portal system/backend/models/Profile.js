const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },

  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  stateRegion: {
    type: String,
    required: true
  },
  experienceYears: {
    type: Number,
    required: true
  },
  additionalDetails: {
    type: String,
    required: true
  },
  
  collegeName: {
      type: String,
      required: true
    },
    collegeCity: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    dept: {
      type: String,
      required: true
    },
    startingYear: {
      type: Number,
      required: true
    },
    graduatingYear: {
      type: Number,
      required: true
    },
    cgpa: {
      type: Number,
      required: true
    },
    historyOfArrears: {
      type: Number,
      required: true
    },
    standingArrears: {
      type: Number,
      required: true
    },
  
  
    class10Percentage: {
      type: Number,
      required: true
    },
    class10PassingYear: {
      type: Number,
      required: true
    },
    class12Percentage: {
      type: Number,
      required: true
    },
    class12PassingYear: {
      type: Number,
      required: true
    }
  
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
