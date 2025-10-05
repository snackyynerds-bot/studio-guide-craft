// src/api/auth.js
const API_BASE = 'http://localhost:5001'; // your backend URL

// Helper to read cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Fetch logged-in user info
export async function getMe() {
  const token = getCookie('token');
  if (!token) {
    console.warn('No token found');
    return { ok: false, message: 'Not authenticated' };
  }

  try {
    const res = await fetch(`${API_BASE}/api/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}` // optional if backend reads cookie
      }
    });
    return await res.json();
  } catch (err) {
    console.error('Error fetching user:', err);
    return { ok: false, message: err.message };
  }
}

// Helper to clear cookies on frontend
const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Logout user
export async function logout() {
  try {
    // Call backend logout endpoint
    await fetch(`${API_BASE}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.error('Error logging out:', err);
  } finally {
    // Clear the token cookie on frontend as well
    clearCookie('token');
    // Redirect to home page
    window.location.href = '/';
  }
}

// Start GitHub OAuth login (no role initially)
export function startGithubLogin() {
  const url = `${API_BASE}/api/auth/github`;
  window.location.href = url;
}

// Set user role after authentication
export async function setUserRole(role) {
  const token = getCookie('token');
  if (!token) {
    return { ok: false, message: 'Not authenticated' };
  }

  try {
    const res = await fetch(`${API_BASE}/api/user/role`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    });
    return await res.json();
  } catch (err) {
    console.error('Error setting role:', err);
    return { ok: false, message: err.message };
  }
}

// Redirect user based on their role
export function redirectBasedOnRole(userRole) {
  if (userRole === 'student') {
    window.location.href = '/student-dashboard';
  } else if (userRole === 'mentor') {
    window.location.href = '/student-dashboard';
  } else {
    window.location.href = '/login';
  }
}
