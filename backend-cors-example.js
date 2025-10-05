// backend-cors-example.js
// This shows where to add CORS in your existing backend

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 👈 ADD THIS IMPORT

const app = express();

// ==================== CORS CONFIGURATION ====================
// 👇 ADD THIS SECTION RIGHT HERE, BEFORE app.use(express.json())

// Simple CORS setup (allows all origins - good for development)
app.use(cors());

// OR use this more secure setup for production:
/*
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'https://your-frontend-domain.vercel.app', // Replace with your actual frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
*/

// Handle preflight requests
app.options('*', cors());

// ==================== END CORS CONFIGURATION ====================

app.use(express.json()); // Your existing middleware

// ==================== SCHEMAS ====================
// ... your existing schemas ...

// ==================== MODELS ====================
// ... your existing models ...

// ==================== ROUTES ====================
// ... your existing routes ...

app.get('/health', (req, res) => {
  res.json({ status: 'ok', cors: 'enabled' });
});

// ... rest of your routes ...

// ==================== SERVER START ====================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/backlund';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API listening on :${PORT}`);
    console.log(`📦 Connected to MongoDB`);
    console.log(`✅ CORS enabled`); // Add this log
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

