const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const app = express();
app.use(bodyParser.json());
const Job=require('../models/Job');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket, ObjectID } = require('mongodb');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');
const Final = require('../models/final');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define job schema

// API routes
app.post('/jobs/uploads', upload.single('image'), (req, res) => {
  const { originalname, buffer } = req.file;
  const writeStream = gfs.openUploadStream(originalname);
  const fileId = writeStream.id;

  writeStream.write(buffer);
  writeStream.end();

  writeStream.on('error', (error) => {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  });

  writeStream.on('finish', () => {
    res.json({ fileId });
  });
});

app.post('/jobs', async (req, res) => {
  const { jobType, title, company, location, level, salary, image } = req.body;

  try {
    const job = new Job({
      jobType,
      title,
      company,
      location,
      level,
      salary,
      image
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully' });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Error creating job' });
  }
});*/

const MongoUrl = "mongodb://127.0.0.1:27017/blog"
const storage = new GridFsStorage({
  url: MongoUrl,
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.originalname
    };
  }
});

const upload = multer({ storage});



// Set up routes
app.post('/jobs', upload.single('image'), async (req, res) => {
  const { jobType, title, company, location, level, salary,about, jobdescription, qualification,responsiblity } = req.body;
  const image = req.file.filename;

  try {
    const job = new Job({
      jobType,
      title,
      company,
      location,
      level,
      salary,
      image,
      about,
      jobdescription,
      qualification,
      responsiblity,
    
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully' });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Error creating job' });
  }
});

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    res.status(500).json({ error: 'Error retrieving jobs' });
  }
});
app.delete('/deletejob/:id', async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    // Find the job by ID and check if it belongs to the authenticated user (if applicable)
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Additional check if the job belongs to the authenticated user (if you have user-specific jobs)
    // You need to store the user ID along with each job entry in the database
    // const userId = req.user._id.toString();
    // if (job.userId !== userId) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    await Job.findByIdAndDelete(jobId);

    return res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/*app.get('/jobs/:filename', (req, res) => {
  const filename = req.params.filename;
  const bucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'uploads',
  });
  const downloadStream = bucket.openDownloadStreamByName(filename);
  downloadStream.pipe(res);
});

app.use(express.static(path.join(__dirname, 'client/build')));

// Handle remaining requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});*/

let ot;
app.post('/adminlogin', (req, res) => {
  const { email, otp,username,password } = req.body;

  if (email === 'vigneshrajtsr@gmail.com' && username==='admin'&& password==="admin" ) {
    // Generate OTP code
    const generatedOtp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    if (otp === ot) {
      const token = jwt.sign({ username: "admin"}, secretKey,{ expiresIn: '1h' });
      res.json({message: 'OTP verification successful. Admin logged in successfully',token} );
    } else {
      res.status(401).json({ error: 'Invalid OTP code' });
    }
  } else {
    res.status(401).json({ error: 'Only admin can use this site' });
  }
});

// OTP Email Sending Endpoint
app.post('/send-otp', (req, res) => {
  const { email,password,username } = req.body;

  if (email === 'vigneshrajtsr@gmail.com' && username==='admin'&& password==="admin") {
    // Generate OTP code
    const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    ot=otpCode;
    // Configure nodemailer with your email service provider details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      logger:true,
      debug:true,
      secureConnection:false,

      auth: {
        user: 'vigneshrajtsr@gmail.com',
        pass: 'fkhlatnuqenyrcbq',
      },
      tls:{
        rejectUnauthorized:true,
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "sarvig2020@gmail.com",
      subject: 'OTP Verification Code',
      text: `Your OTP code is: ${otpCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send OTP code via email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'OTP code sent via email' });
      }
    });
  } else {
    res.status(401).json({ error: 'Only admin can use this site' });
  }
});

// OTP Email Verification Endpoint
/*app.post('/adminlogin', (req, res) => {
  const { email,username,password } = req.body;

  if (email === "vigneshrajtsr@gmail.com" && username==="admin" && password==="admin") {
    // Generate OTP code
    const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Configure nodemailer with your email service provider details
    const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
      port:587,
      auth: {
        user: 'elaina.heidenreich43@ethereal.email',
        pass: 't5hhUhteemB38bhzV2',
      },
    });

    // Email options
    const mailOptions = {
      from: 'vigneshrajtsr@gmail.com',
      to: 'vigneshrajtsr@gmail.com',
      subject: 'OTP Verification Code',
      text: `Your OTP code is: ${otpCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send OTP code via email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'OTP code sent via email' });
      }
    });
  } else {
    res.status(401).json({ error: 'Only admin can use this site' });
  }
});*/

// Start the server
app.get('/adminhome', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const user=decoded;
    if (decoded.username!=="admin" && decoded.password!=="admin") {
      return res.status(404).json({ message: 'User not found' });
    }
   else{
    res.json(user);
   }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/applications', async (req, res) => {
  try {
    const jobApplications = await Final.find();
    res.status(200).json(jobApplications);
  } catch (error) {
    console.error('Error retrieving job applications:', error);
    res.status(500).json({ error: 'Error retrieving job applications' });
  }
});

// Route to handle file download
// Route to handle file download based on filename
const conn = mongoose.connection;
app.get('/download/:filename', async (req, res) => {
  const { filename } = req.params;

  try {
    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads', // GridFS collection name
    });

    // Find the file by filename in the GridFS bucket
    const file = await gfs.find({ filename }).toArray();
    
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set the appropriate content type for the download
    res.set('Content-Type', file[0].contentType); // Content type is stored in the GridFS file metadata

    // Create a download stream and pipe it to the response
    const downloadStream = gfs.openDownloadStreamByName(filename);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error downloading file' });
  }
});

module.exports = app;