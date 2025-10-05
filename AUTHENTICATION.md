# Authentication Flow

## Overview
This application uses GitHub OAuth for authentication with role-based access control. Users authenticate with GitHub first, then choose their role (Student or Mentor), and are redirected to role-specific dashboards.

## Authentication Flow

```
┌─────────────────┐
│  Landing Page   │  User clicks "Login with GitHub"
│       (/)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub OAuth   │  User authorizes the app
│                 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Backend Auth   │  Creates user (no role yet)
│    Callback     │  Sets auth token
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Role Selection  │  User sees "I'm a Student" / "I'm a Mentor"
│    (/login)     │  Welcome message shows GitHub username
└────────┬────────┘
         │
         ├─────────Student─────────┐
         │                         │
         ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│     Student      │    │      Mentor      │
│    Dashboard     │    │    Dashboard     │
└──────────────────┘    └──────────────────┘
```

### 1. Landing Page (`/`)
- The main landing page displays "Login with GitHub" buttons
- When users click these buttons, they are redirected to GitHub OAuth (no role selected yet)
- Calls `startGithubLogin()` which redirects to `/api/auth/github`

### 2. GitHub OAuth Process
- The user is redirected to GitHub's OAuth page
- After successful authentication, GitHub redirects back to your backend callback
- Backend creates/updates the user WITHOUT a role initially

### 3. Backend Processing (Initial Auth)
- Your backend should:
  1. Exchange the OAuth code for an access token
  2. Fetch user information from GitHub
  3. Create or update the user in your database (WITHOUT setting role yet)
  4. Set a session cookie with the JWT token
  5. Redirect to `/login` page for role selection

### 4. Role Selection Page (`/login`)
- After GitHub authentication, user is redirected here
- The page checks if the user is authenticated
- If user already has a role, redirect to their dashboard
- If no role, show two cards:
  - **I'm a Student** - for learners seeking mentorship
  - **I'm a Mentor** - for experienced developers offering mentorship
- Clicking a button calls `handleRoleSelection(role)` which:
  1. Calls `setUserRole(role)` API
  2. Updates user's role in the database
  3. Redirects to appropriate dashboard

### 5. Role Assignment
- When user clicks a role button, `setUserRole(role)` is called
- This makes a POST request to `/api/user/role` with the chosen role
- Backend updates the user's role in the database
- Frontend redirects to appropriate dashboard

### 6. Dashboard Access
- Each dashboard page checks:
  1. If the user is authenticated (has a valid token)
  2. If the user's role matches the dashboard type
- If checks fail, users are redirected to:
  - `/login` if not authenticated
  - The correct dashboard for their role if accessing the wrong one

## Role-Based Access Control

### Protected Routes
- `/student-dashboard/*` - Only accessible by users with role='student'
- `/mentor-dashboard/*` - Only accessible by users with role='mentor'

### Role Verification
Each protected page includes role verification:
```javascript
const res = await getMe();
if (res.ok) {
  setUser(res.user);
  // Verify user role
  if (res.user?.role && res.user.role !== expectedRole) {
    // Redirect to correct dashboard
    window.location.href = res.user.role === 'student' 
      ? '/student-dashboard' 
      : '/mentor-dashboard';
  }
}
```

## Backend Requirements

Your backend needs to implement these endpoints:

### 1. `/api/auth/github`
- Initiates GitHub OAuth flow
- Redirects to GitHub OAuth authorization page

### 2. `/api/auth/github/callback`
- Handles GitHub OAuth callback
- Exchanges code for access token
- Fetches user data from GitHub
- Creates/updates user in database (WITHOUT role initially)
- Issues JWT token in cookie
- Redirects to `/login` for role selection

### 3. `/api/user/role`
- POST endpoint to set user role
- Requires authentication
- Body: `{ "role": "student" | "mentor" }`
- Updates user's role in database
- Returns updated user data
- Response format:
```json
{
  "ok": true,
  "user": {
    "_id": "...",
    "username": "...",
    "role": "student" | "mentor",
    ...
  }
}
```

### 4. `/api/me`
- Returns current user information including role
- Requires authentication (token in cookie or Authorization header)
- Response format:
```json
{
  "ok": true,
  "user": {
    "_id": "...",
    "username": "...",
    "email": "...",
    "role": "student" | "mentor",
    "githubData": { ... }
  }
}
```

### 5. `/api/logout`
- Clears session/token
- Returns success response

## Files Modified

### Frontend
- `src/pages/Index.tsx` - Landing page with "Login with GitHub" buttons
- `src/pages/Login.tsx` - Role selection page
- `src/pages/StudentDashboard.tsx` - Student dashboard with role verification
- `src/pages/MentorDashboard.tsx` - Mentor dashboard with role verification
- `src/pages/Profile.tsx` - Profile page with role verification
- `src/api/auth.js` - Authentication helper functions

### Helper Functions
- `startGithubLogin()` - Initiates GitHub OAuth (no role)
- `setUserRole(role)` - Sets user's role after authentication
- `getMe()` - Fetches current user data
- `logout()` - Logs out current user
- `redirectBasedOnRole(userRole)` - Redirects user to appropriate dashboard

## User Experience

1. User lands on homepage → sees "Login with GitHub" button
2. Clicks button → redirected to GitHub OAuth
3. Authorizes on GitHub → redirected to role selection page (`/login`)
4. Sees welcome message with their GitHub username
5. Chooses role (Student/Mentor) → role is saved
6. Redirected to appropriate dashboard (student or mentor)
7. Can navigate within their role-specific pages
8. If they try to access wrong dashboard → automatically redirected to correct one
9. If not authenticated → redirected to login page
10. If already has role and visits `/login` → auto-redirected to their dashboard

## Security Notes

- Always verify user role on the backend before serving sensitive data
- Frontend role checks are for UX only - not for security
- Store roles securely in the database
- Use HTTPS in production
- Set secure, httpOnly cookies for tokens

