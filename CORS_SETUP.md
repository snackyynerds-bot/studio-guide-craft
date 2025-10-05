# CORS Setup Guide for Backend API

## Problem

When your frontend (hosted on one domain) tries to access your backend API (hosted on another domain), browsers block these requests due to CORS (Cross-Origin Resource Sharing) security policy.

## Solution

You need to configure CORS on your **backend** (https://backlund-service-fwaq.vercel.app/).

## Backend CORS Configuration

Add this to your Express backend code (at the top, after creating the `app`):

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ADD THIS

const app = express();

// ==================== CORS CONFIGURATION ====================
// ADD THIS SECTION BEFORE OTHER MIDDLEWARE

// Option 1: Allow ALL origins (for development/testing)
app.use(cors());

// Option 2: Allow specific origins (RECOMMENDED for production)
const allowedOrigins = [
  'http://localhost:5173',           // Local development
  'http://localhost:3000',           // Alternative local port
  'https://your-frontend-domain.vercel.app',  // Your production frontend
  'https://studio-guide-craft.vercel.app',    // If you deploy to Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

// ==================== EXISTING MIDDLEWARE ====================
app.use(express.json());

// ... rest of your code
```

## Installation

If you don't have the `cors` package installed, add it:

```bash
npm install cors
```

## For Vercel Deployment

If you're deploying to Vercel, make sure your `vercel.json` includes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" }
      ]
    }
  ]
}
```

## Quick Fix (Development Only)

If you just want to test quickly, use this simple CORS setup:

```javascript
const cors = require('cors');
app.use(cors()); // Allow all origins
```

⚠️ **Warning**: This is NOT recommended for production as it allows requests from ANY origin.

## Recommended Production Setup

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Then add to your `.env`:
```
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## Testing

After adding CORS configuration:

1. Redeploy your backend to Vercel
2. Open your frontend in the browser
3. Check the browser console - CORS errors should be gone
4. Try making API calls from your frontend

## Common CORS Errors

### Error: "No 'Access-Control-Allow-Origin' header is present"
**Fix**: Add `app.use(cors())` to your backend

### Error: "CORS policy: Credentials flag is 'true', but the 'Access-Control-Allow-Credentials' header is ''"
**Fix**: Add `credentials: true` to your CORS options

### Error: "Method PUT is not allowed by Access-Control-Allow-Methods"
**Fix**: Add all required methods to your CORS configuration

## Current Configuration

Your frontend is now configured to use:
- **Backend API**: https://backlund-service-fwaq.vercel.app

Make sure your backend is properly configured with CORS to accept requests from your frontend domain.

