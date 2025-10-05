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

// Logout user
export async function logout() {
  try {
    await fetch(`${API_BASE}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.error('Error logging out:', err);
  } finally {
    window.location.href = '/';
  }
}

// Start GitHub OAuth login
export function startGithubLogin(role) {
  const url = role ? `${API_BASE}/api/auth/github?role=${role}` : `${API_BASE}/api/auth/github`;
  window.location.href = url;
}
