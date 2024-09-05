const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

dotenv.config();

// Passport configuration
require('./config/passport')(passport);

const app = express();
app.use(express.json());

// Enable CORS
// app.use(cors({
//   origin: 'https://jobhunt-umen.onrender.com', // Frontend URL
//   credentials: true, // Allow credentials (cookies, etc.)
// }));
app.use(cors({
  origin: ['https://jobhunt-umen.onrender.com', 'https://jobhunt-mern.onrender.com'], // Allow both domains
  credentials: true, // Allow credentials (cookies, etc.)
}));



// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.get('*', (req, res) => {
  res.send("wrong url")
});


// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/job-hunt')
  .then(() => {
    console.log('Database connected ✅');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
