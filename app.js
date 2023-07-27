// app.js
require('dotenv').config();     // This line stays on top
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectToDB } = require('./db');

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
