const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const secretKey = 'your-secret-key';
const Job=require('../models/Job');
const Final = require('../models/final');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
let token=123;
// Login route
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your'); // Replace 'your_secret_key' with your actual secret key

    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    console.log(token);
    res.status(500).json({ message: 'ServerjghgError' });
  }
};


// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/dashboard', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId, 'username email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/profile', async (req, res) => {
  const { 
    username,
    name,
    surname,
    mobileNumber,
    addressLine1,
    addressLine2,
    postcode,
    state,
    area,
    email,
    education,
    country,
    stateRegion,
    experienceYears,
    additionalDetails,
    collegeName,
    collegeCity,
    degree,
    dept,
    startingYear,
    graduatingYear,
    cgpa,
    historyOfArrears,
    standingArrears,
    class10Percentage,
    class10PassingYear,
    class12Percentage,
    class12PassingYear,
  } = req.body;
  try {
    // Extract the profile data from the request body
    const existingUser = await Profile.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already have added details and you can update the details' });
    }
    const newProfile = new Profile({
      username,
      name,
      surname,
      mobileNumber,
      addressLine1,
      addressLine2,
      postcode,
      state,
      area,
      email,
      education,
      country,
      stateRegion,
      experienceYears,
      additionalDetails,
      collegeName,
      collegeCity,
      degree,
      dept,
      startingYear,
      graduatingYear,
      cgpa,
      historyOfArrears,
      standingArrears,
      class10Percentage,
      class10PassingYear,
      class12Percentage,
      class12PassingYear,
    });

    const savedUser = await newProfile.save();
    // Perform any necessary validation or data manipulation

    // Save the profile data to the database or perform any desired actions
    // You can use a database ORM like Sequelize or Mongoose for database operations

    // Return a success response
    return res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/profileadd', async (req, res) => {
  const {
    username,
    name,
    surname,
    mobileNumber,
    addressLine1,
    addressLine2,
    postcode,
    state,
    area,
    email,
    education,
    country,
    stateRegion,
    experienceYears,
    additionalDetails,
    collegeName,
    collegeCity,
    degree,
    dept,
    startingYear,
    graduatingYear,
    cgpa,
    historyOfArrears,
    standingArrears,
    class10Percentage,
    class10PassingYear,
    class12Percentage,
    class12PassingYear,
  } = req.body;
 

  try {
    // Extract the profile data from the request body

 
  
  
    // Find the existing profile in the database
    const existingProfile = await Profile.findOne({username});

    if (!existingProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update the profile data
    existingProfile.name = name;
    existingProfile.surname = surname;
    existingProfile.mobileNumber = mobileNumber;
    existingProfile.addressLine1 = addressLine1;
    existingProfile.addressLine2 = addressLine2;
    existingProfile.postcode = postcode;
    existingProfile.state = state;
    existingProfile.area = area;
  
    existingProfile.education = education;
    existingProfile.country = country;
    existingProfile.stateRegion = stateRegion;
    existingProfile.experienceYears = experienceYears;
    existingProfile.additionalDetails = additionalDetails;
    existingProfile.collegeName = collegeName;
    existingProfile.collegeCity = collegeCity;
    existingProfile.degree = degree;
    existingProfile.dept = dept;
    existingProfile.startingYear = startingYear;
    existingProfile.graduatingYear = graduatingYear;
    existingProfile.cgpa = cgpa;
    existingProfile.historyOfArrears = historyOfArrears;
    existingProfile.standingArrears = standingArrears;
    existingProfile.class10Percentage = class10Percentage;
    existingProfile.class10PassingYear = class10PassingYear;
    existingProfile.class12Percentage = class12Percentage;
    existingProfile.class12PassingYear = class12PassingYear;

    // Save the updated profile to the database
    await existingProfile.save();

    // Return a success response
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/profileadd', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    
    const decoded = jwt.verify(token, secretKey);
      
    const existingProfile = await Profile.findOne( decoded.username );

    if (!existingProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
   

    if (!existingProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(existingProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/showjobs', async (req, res) => {
  try {
    const jobs = await Job.find().lean();
    res.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Error fetching jobs' });
  }
});
router.get('/showjobs/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ job });
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//const Upload = multer({ dest: 'uploads/' });

// Import the schema/model


// Route to handle resume upload and job profile creation
/*router.post('/apply', Upload.single('resume'), async (req, res) => {
  try {
    // Create a new job profile entry in the database
    const jobData = {
      username: req.body.username,
      email: req.body.email,
      jobType: req.body.jobType,
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
s      level: req.body.level,
      salary: req.body.salary,
      resumePath: req.file.path, // Save the file path in the database
    };

    const newJobProfile = new Final(jobData);
    await newJobProfile.save();

    res.status(201).json({ message: 'Job profile created successfully' });
  } catch (error) {
    console.error('Error creating job profile:', error);
    res.status(500).json({ message: 'Error creating job profile' });
  }
});*/
const { GridFsStorage } = require('multer-gridfs-storage');
const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/blog",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // Set the collection name for GridFS
      filename: file.originalname, // Use the original file name as the filename in GridFS
    };
  },
});
const upload = multer({ dest: 'uploads/' });
const up = multer({ storage }).single('resume');
router.post('/apply', up, async (req, res) => {
  try {
    const { username, email, jobType, title, company, location, level, salary } = req.body;
    const resume = req.file.originalname; // Get the filename of the uploaded resume

    // Save the job application details to MongoDB
    const jobApplication = new Final({
      username,
      email,
      jobType,
      title,
      company,
      location,
      level,
      salary,
      resume,
    });

    await jobApplication.save();

    res.status(200).json({ message: 'Job application and file uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file and applying for the job:', error);
    res.status(500).json({ error: 'Error uploading file and applying for the job' });
  }
});
const uploadFile = multer({ storage }).single('file');

// Route to handle file upload
router.post('/upload', uploadFile, async (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Route to handle file download
router.get('/download/:filename', async (req, res) => {
  const { filename } = req.params;

  try {
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'uploads', // Set the collection name for GridFS
    });

    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error downloading file' });
  }
});
router.get('/checkapplication', async (req, res) => {
  const { username, jobType, title, company, location, level, salary } = req.query;

  try {
    const alreadyApplied = await Final.findOne({
      username,
      jobType,
      title,
      company,
      location,
      level,
      salary,
    });

    res.json({ alreadyApplied: !!alreadyApplied }); // Convert to boolean
  } catch (error) {
    console.error('Error checking application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// auth.js

// ... (existing code)

// Endpoint to fetch jobs applied by a user based on username
router.get('/userjobs/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Assuming you have a JobApplication model defined
    const userJobs = await Final.find({ username });
    res.json(userJobs);
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... (existing code)








module.exports = router;