const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');

const app = express();

// Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
app.use(cors({
  origin: 'https://event-photo-app.onrender.com', // your frontend Render URL
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads/photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Routes registered:');
  console.log('  - /api/auth');
  console.log('  - /api/events');
  console.log('  - /api/photos');
});
//  const crypto = require('crypto');

// // Generate a 32-byte (64-character hex) random token
// const token = crypto.randomBytes(32).toString('hex');
// console.log(token);