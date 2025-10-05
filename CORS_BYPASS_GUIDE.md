# 🔓 CORS Bypass Guide - Frontend Solutions

Since you can't modify the backend, here are **3 working solutions** to bypass CORS from the frontend.

---

## 🎯 Solution 1: Vite Dev Proxy (Development Only) ✅ **RECOMMENDED FOR DEV**

### How it works:
Vite's dev server acts as a proxy, forwarding your API requests to the backend, bypassing CORS.

### Configuration:
Already configured in `vite.config.ts`:
```javascript
proxy: {
  '/api': {
    target: 'https://backlund-service-fwaq.vercel.app',
    changeOrigin: true,
    secure: false,
  },
}
```

### Usage:
```bash
npm run dev
```
Your app will now make requests to `http://localhost:5173/api/*` which Vite proxies to your backend.

### Pros:
- ✅ No external dependencies
- ✅ Fast and reliable
- ✅ Works perfectly in development

### Cons:
- ❌ Only works in development (not in production build)

---

## 🎯 Solution 2: CORS Proxy Service (Production) ✅ **RECOMMENDED FOR PRODUCTION**

### How it works:
A third-party service sits between your frontend and backend, adding CORS headers.

### Available Proxies:
1. **corsproxy.io** (Default, Free, No setup)
2. **allorigins.win** (Alternative)

### Configuration:
Already configured in `src/api/backend.js`:
```javascript
const PROXY_METHOD = 'corsproxy'; // or 'allorigins'
```

### How to switch proxies:
In `src/api/backend.js`, change line 21:
```javascript
const PROXY_METHOD = 'allorigins'; // Switch to allorigins if corsproxy is down
```

### Pros:
- ✅ Works in production
- ✅ No code changes needed
- ✅ Free to use
- ✅ Already configured

### Cons:
- ⚠️ Adds slight latency
- ⚠️ Depends on third-party service
- ⚠️ May have rate limits

---

## 🎯 Solution 3: Vercel Rewrites (Production) ✅ **BEST FOR VERCEL DEPLOYMENT**

### How it works:
Vercel's edge network proxies your API requests, avoiding CORS entirely.

### Configuration:
Already configured in `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://backlund-service-fwaq.vercel.app/api/:path*"
    }
  ]
}
```

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Pros:
- ✅ No CORS issues
- ✅ No third-party dependencies
- ✅ Fast (edge network)
- ✅ Production-ready

### Cons:
- ❌ Only works when deployed to Vercel

---

## 🚀 Quick Start Guide

### For Development (Local Testing):
```bash
# 1. Start your dev server
npm run dev

# 2. Open http://localhost:5173
# 3. API calls will automatically use Vite proxy
# 4. No CORS issues! ✅
```

### For Production (Deployed):

**Option A: Deploy to Vercel (Recommended)**
```bash
vercel
```
- Uses `vercel.json` rewrites
- No CORS issues
- Best performance

**Option B: Deploy to any platform**
```bash
npm run build
npm run preview
```
- Uses corsproxy.io automatically
- Works on Netlify, Cloudflare Pages, etc.
- Slight latency from proxy

---

## 🔧 Current Configuration

Your app is now configured to:

### Development (npm run dev):
```
Your App (localhost:5173) 
    ↓
Vite Proxy 
    ↓
Backend (backlund-service-fwaq.vercel.app)
```
✅ No CORS issues

### Production Build:
```
Your App 
    ↓
CORS Proxy (corsproxy.io) 
    ↓
Backend (backlund-service-fwaq.vercel.app)
```
✅ No CORS issues

### Production on Vercel:
```
Your App 
    ↓
Vercel Edge Network 
    ↓
Backend (backlund-service-fwaq.vercel.app)
```
✅ No CORS issues, Best performance

---

## 🎮 How to Switch Between Methods

Edit `src/api/backend.js`, line 21:

```javascript
// Method 1: Use corsproxy.io (default)
const PROXY_METHOD = 'corsproxy';

// Method 2: Use allorigins.win
const PROXY_METHOD = 'allorigins';

// Method 3: Direct connection (requires backend CORS)
const PROXY_METHOD = 'direct';
```

---

## 🧪 Testing Your Setup

### Test 1: Check Current Configuration
Open browser console and look for:
```
🔧 API Configuration: {
  environment: "Development",
  backend: "https://backlund-service-fwaq.vercel.app",
  usingViteProxy: true,
  corsProxy: "corsproxy",
  strategy: "Vite Dev Proxy"
}
```

### Test 2: Make an API Call
Try visiting any page that loads data (e.g., Find Mentor page)
- ✅ If data loads → CORS bypass is working!
- ❌ If you see CORS error → Check console logs

### Test 3: Use Test Page
Open `test-backend.html` in your browser:
```bash
# Serve the test file
npx serve .
# Open http://localhost:3000/test-backend.html
```

---

## 🐛 Troubleshooting

### Issue 1: CORS error in development
**Solution**: Restart your dev server
```bash
npm run dev
```

### Issue 2: CORS error in production
**Solution**: Check if you're using the right proxy:
```javascript
// Try switching proxy
const PROXY_METHOD = 'allorigins'; // Instead of 'corsproxy'
```

### Issue 3: Proxy is slow
**Solution**: Deploy to Vercel to use edge network rewrites (fastest)

### Issue 4: "Failed to fetch" error
**Causes**:
1. Backend is down
2. Wrong backend URL
3. Network issue

**Solution**: Check backend health:
```bash
curl https://backlund-service-fwaq.vercel.app/health
```

---

## 📊 Performance Comparison

| Method | Speed | Reliability | Setup | Best For |
|--------|-------|-------------|-------|----------|
| Vite Proxy | ⚡⚡⚡ Fast | ✅ High | Easy | Development |
| CORS Proxy | ⚡ Medium | ⚠️ Medium | None | Quick Deploy |
| Vercel Rewrites | ⚡⚡⚡ Fast | ✅ High | Easy | Production |

---

## 🎯 Recommended Setup

1. **Development**: Use Vite proxy (automatic)
2. **Quick Testing**: Use CORS proxy (corsproxy.io)
3. **Production**: Deploy to Vercel with rewrites

---

## 💡 Pro Tips

1. **For fastest development**: Just use Vite proxy (already configured)
2. **For production**: Deploy to Vercel for best performance
3. **Need quick deploy elsewhere**: CORS proxy works on any platform
4. **Proxy is slow?**: Switch between corsproxy and allorigins
5. **Want to avoid proxies?**: Ask backend team to enable CORS (best solution)

---

## 🔄 Quick Commands

```bash
# Development (uses Vite proxy)
npm run dev

# Build for production (uses CORS proxy)
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel (uses Vercel rewrites)
npx vercel
```

---

## ✅ Your App is Now CORS-Free!

All three solutions are configured. The app automatically:
- Uses Vite proxy in development
- Uses CORS proxy in production builds
- Uses Vercel rewrites when deployed to Vercel

No more CORS errors! 🎉

