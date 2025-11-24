// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();
// const eventRoutes = require('./routes/eventRoutes');
// const authRoutes = require('./routes/authRoutes');
// const photoRoutes = require('./routes/photoRoutes');

// const app = express();

// // Middleware
// // app.use(cors({
// //   origin: 'http://localhost:5173',
// //   credentials: true
// // }));
// app.use(cors({
//   origin: 'https://event-photo-app-y2y9.onrender.com', // your frontend Render URL
//   credentials: true
// }));
// app.use(express.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false, // set true if using HTTPS
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));
// const fs = require('fs');
// const uploadsDir = path.join(__dirname, 'uploads/photos');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
// // Routes
// app.use('/api/events', eventRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/photos', photoRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log('Routes registered:');
//   console.log('  - /api/auth');
//   console.log('  - /api/events');
//   console.log('  - /api/photos');
// });
// //  const crypto = require('crypto');

// // // Generate a 32-byte (64-character hex) random token
// // const token = crypto.randomBytes(32).toString('hex');
// // console.log(token);
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const pool = require('./db');

const sessionStore = new MySQLStore({}, pool); // <- pass the plain pool


const app = express();

// ------------------------
// CORS - allow frontend to talk to backend
// ------------------------
// server.js - UPDATE CORS
app.use(cors({
  origin: 'https://event-photo-app-y2y9.onrender.com', // Your exact frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ------------------------
// Session store in MySQL (persistent for production)
// ------------------------



// server.js - Session config
// In your main server.js file
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-prod',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,           // Required for cross-site on HTTPS
    sameSite: 'none',       // THIS IS THE KEY — allows cross-origin
    maxAge: 24 * 60 * 60 * 1000,
    domain: undefined,      // Let browser decide (important!)
    path: '/'
  }
}));
// ------------------------
// Middleware
// ------------------------
app.use(express.json());

// ------------------------
// Uploads folder
// ------------------------
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads/photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ------------------------
// Routes
// ------------------------
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Routes registered:');
  console.log('  - /api/auth');
  console.log('  - /api/events');
  console.log('  - /api/photos');
});
