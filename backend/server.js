const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

dotenv.config();

require('./config/passport')(passport);

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies to be sent
}));

// Configure session middleware
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use environment variable for secret
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/job-hunt',
    collectionName: 'sessions',
  }),
};

app.use(session(sessionOptions));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes/index"));
app.use('/auth', require('./routes/auth'));

// Connect to MongoDB and then start the server
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
