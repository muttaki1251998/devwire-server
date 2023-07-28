// app.js
require('dotenv').config();     // This line stays on top
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectToDB } = require('./db');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Routes
const registerRoutes = require('./api/authRoutes/register')
const loginRoutes = require('./api/authRoutes/login');

const app = express();
const PORT = process.env.PORT || 8080;

// App middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(session({
  secret: process.env.SESSION_SECRET, // replace with your own secret
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// passport configuration:
require('./config/passport')(passport);

app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);



app.get('/', (req, res) => {
  res.send('Hello, world!');
});

connectToDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
