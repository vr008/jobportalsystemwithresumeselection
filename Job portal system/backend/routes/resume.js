// backend/routes/resume.js

const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { exec } = require('child_process');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route to process resumes using NLP
// Route to process resumes using NLP
router.post('/processResumes', upload.array('resumes'), (req, res) => {
  console.log(req.files);
  const resumePaths = req.files.map((file) => {
    return file.path.replace(/\\/g, '/');
  });
  const { keywords } = req.query
  const pythonScriptPath = '"C:/Users/HP/OneDrive/Documents/React project/Job portal system/backend/routes/nlp.py"';
  const { job_descriptions } = req.body;
  
  console.log(pythonScriptPath);
  const resume='"C:/Users/HP/OneDrive/Documents/React project/Job portal system/backend/';
  const a=resume+resumePaths.join('" "');
  console.log(resumePaths.join('" "'));
  console.log(a);
  const command = `python ${pythonScriptPath} ${a}" "${keywords}"`;
  console.log(command);

  // Execute the command using exec
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error processing resumes:', err);
      res.status(500).json({ error: 'Error processing resumes' });
    } else {
      try {
        // Parse the JSON results returned by the Python script
        const nlpResults = JSON.parse(stdout);
        res.json(nlpResults);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).json({ error: 'Error processing resumes' });
      }
    }
  });
});


module.exports = router;
