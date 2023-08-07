
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const InitiateMongoServer = require("./config/db");
const admin=require("./routes/admin");
const app = express();
const User=require('./models/User');
const Jobshow=require('./routes/jobshow');
const resume=require('./routes/resume');
// Middleware
InitiateMongoServer();

app.use(cors());
app.use(express.json());

// Connect to MongoDB



// Routes
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.use('/auth', authRoutes);
app.use("/admin",admin);
app.use('/resume',resume);
//app.use("/jobshow",Jobshow);
// Dashboard route

// Logout route

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});