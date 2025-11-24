const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const pool = require('./db');

// MySQL session store (persists across restarts)
const sessionStore = new MySQLStore({}, pool);

const app = express();

// 1. CORS – must be FIRST
app.use(cors({
  origin: 'https://event-photo-app-y2y9.onrender.com', // ← your exact frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 2. Body parser
app.use(express.json());

// 3. Session config – THIS IS THE ONE THAT WORKS ON RENDER
app.use(session({
  name: 'sid',                          // small cookie name
  secret: process.env.SESSION_SECRET || 'change-me-to-a-long-random-string',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  proxy: true,                          // ← CRITICAL for Render (trusts the HTTPS proxy)
  cookie: {
    httpOnly: true,
    secure: true,                       // ← Secure + SameSite=None = cross-site allowed
    sameSite: 'none',                   // ← Allows cookie from another domain
    maxAge: 24 * 60 * 60 * 1000,        // 24 hours
    path: '/',
  }
}));

// 4. Create uploads folder if missing
const uploadsDir = path.join(__dirname, 'uploads/photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 5. Serve uploaded photos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 6. Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/photos', photoRoutes);

// 7. Optional: Debug route (remove in production)
app.get('/api/debug/session', (req, res) => {
  res.json({
    loggedIn: !!req.session.userId,
    userId: req.session.userId,
    username: req.session.username,
    sessionID: req.sessionID,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: https://event-photo-app-y2y9.onrender.com`);
});