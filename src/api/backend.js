// src/api/backend.js

// Backend URL configuration
const BACKEND_URL = 'https://backlund-service-fwaq.vercel.app';

// Detect environment
const isDevelopment = import.meta.env.DEV;

// CORS Proxy configuration
// Option 1: corsproxy.io (free, no setup required)
// Option 2: allorigins.win (alternative)
// Option 3: cors-anywhere (need to deploy your own)
const CORS_PROXIES = {
  corsproxy: 'https://corsproxy.io/?',
  allorigins: 'https://api.allorigins.win/raw?url=',
  // Use null for direct connection (requires backend CORS to be enabled)
  direct: null,
};

// Choose your proxy method
const PROXY_METHOD = 'corsproxy'; // Options: 'corsproxy', 'allorigins', 'direct'

// In development, use Vite proxy (configured in vite.config.ts)
// In production, use CORS proxy
const USE_VITE_PROXY = isDevelopment;
const CORS_PROXY = CORS_PROXIES[PROXY_METHOD];

console.log('🔧 API Configuration:', {
  environment: isDevelopment ? 'Development' : 'Production',
  backend: BACKEND_URL,
  usingViteProxy: USE_VITE_PROXY,
  corsProxy: PROXY_METHOD,
  strategy: USE_VITE_PROXY ? 'Vite Dev Proxy' : (CORS_PROXY ? 'CORS Proxy' : 'Direct Connection')
});

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    let url;
    
    if (USE_VITE_PROXY) {
      // In development, use relative URL to leverage Vite proxy
      url = endpoint;
    } else if (CORS_PROXY && PROXY_METHOD === 'corsproxy') {
      // Use corsproxy.io format
      url = `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + endpoint)}`;
    } else if (CORS_PROXY && PROXY_METHOD === 'allorigins') {
      // Use allorigins format
      url = `${CORS_PROXY}${encodeURIComponent(BACKEND_URL + endpoint)}`;
    } else {
      // Direct connection (requires backend CORS)
      url = `${BACKEND_URL}${endpoint}`;
    }
    
    const response = await fetch(url, {
      ...options,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API request failed' }));
      throw new Error(error.message || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    // Enhanced error logging for CORS issues
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      console.error('❌ CORS Error or Network Error - Please check:', {
        endpoint,
        backend: API_BASE,
        issue: 'The backend may not have CORS enabled or is unreachable',
        solution: 'Check CORS_SETUP.md for backend configuration'
      });
      throw new Error('Unable to connect to backend. Please check if CORS is enabled on the server.');
    }
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// ==================== USER PROFILE MANAGEMENT ====================

export async function getCompleteProfile(userId) {
  return apiCall(`/api/profile/complete/${userId}`);
}

export async function updateUserProfile(userId, data) {
  return apiCall(`/api/profile/user/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function createMentorProfile(userId, data) {
  return apiCall(`/api/profile/mentor/${userId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateMentorProfile(userId, data) {
  return apiCall(`/api/profile/mentor/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function updateContributorProfile(userId, data) {
  return apiCall(`/api/profile/contributor/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// ==================== GITHUB DATA ====================

export async function getGithubProfile(userId) {
  return apiCall(`/api/github/profile/${userId}`);
}

export async function syncGithubContributions(userId, contributions) {
  return apiCall('/api/github/sync-contributions', {
    method: 'POST',
    body: JSON.stringify({ userId, contributions }),
  });
}

// ==================== MENTOR SKILLS & EXPERTISE ====================

export async function addMentorSkills(mentorProfileId, skills) {
  return apiCall(`/api/mentor/${mentorProfileId}/skills`, {
    method: 'POST',
    body: JSON.stringify({ skills }),
  });
}

export async function getMentorSkills(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/skills`);
}

export async function deleteMentorSkill(mentorProfileId, skillId) {
  return apiCall(`/api/mentor/${mentorProfileId}/skills/${skillId}`, {
    method: 'DELETE',
  });
}

export async function addMentorExpertise(mentorProfileId, expertiseAreas) {
  return apiCall(`/api/mentor/${mentorProfileId}/expertise`, {
    method: 'POST',
    body: JSON.stringify({ expertiseAreas }),
  });
}

export async function getMentorExpertise(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/expertise`);
}

export async function addMentorSpecializations(mentorProfileId, specializations) {
  return apiCall(`/api/mentor/${mentorProfileId}/specializations`, {
    method: 'POST',
    body: JSON.stringify({ specializations }),
  });
}

export async function getMentorSpecializations(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/specializations`);
}

// ==================== WORK EXPERIENCE & CREDENTIALS ====================

export async function addWorkExperience(mentorProfileId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/experience`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getWorkExperience(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/experience`);
}

export async function updateWorkExperience(mentorProfileId, experienceId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/experience/${experienceId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteWorkExperience(mentorProfileId, experienceId) {
  return apiCall(`/api/mentor/${mentorProfileId}/experience/${experienceId}`, {
    method: 'DELETE',
  });
}

export async function addCertification(mentorProfileId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/certifications`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getCertifications(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/certifications`);
}

export async function deleteCertification(mentorProfileId, certId) {
  return apiCall(`/api/mentor/${mentorProfileId}/certifications/${certId}`, {
    method: 'DELETE',
  });
}

export async function addCompetitionExperience(mentorProfileId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/competitions`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getCompetitionExperience(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/competitions`);
}

export async function updateCompetitionExperience(mentorProfileId, compId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/competitions/${compId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteCompetitionExperience(mentorProfileId, compId) {
  return apiCall(`/api/mentor/${mentorProfileId}/competitions/${compId}`, {
    method: 'DELETE',
  });
}

export async function addOpenSourceAchievement(mentorProfileId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/opensource`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getOpenSourceAchievements(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/opensource`);
}

// ==================== BADGES & AVAILABILITY ====================

export async function addMentorBadge(mentorProfileId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/badges`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMentorBadges(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/badges`);
}

export async function setMentorAvailability(mentorProfileId, schedule) {
  return apiCall(`/api/mentor/${mentorProfileId}/availability`, {
    method: 'POST',
    body: JSON.stringify({ schedule }),
  });
}

export async function getMentorAvailability(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/availability`);
}

export async function addUnavailableDate(mentorProfileId, data) {
  return apiCall(`/api/mentor/${mentorProfileId}/unavailable`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getUnavailableDates(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/unavailable`);
}

// ==================== COMPLETE MENTOR PROFILE ====================

export async function getCompleteMentorProfile(mentorProfileId) {
  return apiCall(`/api/mentor/${mentorProfileId}/complete`);
}

// ==================== SESSIONS ====================

export async function createSession(data) {
  return apiCall('/api/sessions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getSession(sessionId) {
  return apiCall(`/api/sessions/${sessionId}`);
}

export async function getUserSessions(userId, role = null, status = null) {
  const params = new URLSearchParams();
  if (role) params.append('role', role);
  if (status) params.append('status', status);
  
  const query = params.toString() ? `?${params.toString()}` : '';
  return apiCall(`/api/sessions/user/${userId}${query}`);
}

export async function updateSessionStatus(sessionId, status) {
  return apiCall(`/api/sessions/${sessionId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function updateSessionOutcome(sessionId, data) {
  return apiCall(`/api/sessions/${sessionId}/outcome`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function getSessionStats(userId, role) {
  return apiCall(`/api/sessions/stats/${userId}?role=${role}`);
}

// ==================== REVIEWS ====================

export async function createSessionReview(sessionId, data) {
  return apiCall(`/api/sessions/${sessionId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getSessionReviews(sessionId) {
  return apiCall(`/api/sessions/${sessionId}/reviews`);
}

export async function getMentorReviews(mentorId, minRating = null, limit = null) {
  const params = new URLSearchParams();
  if (minRating) params.append('minRating', minRating);
  if (limit) params.append('limit', limit);
  
  const query = params.toString() ? `?${params.toString()}` : '';
  return apiCall(`/api/sessions/mentor/${mentorId}/reviews${query}`);
}

// ==================== SEARCH & MATCHING ====================

export async function searchMentors(filters) {
  return apiCall('/api/search/mentors', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
}

export async function getTopMentors(technology = null, limit = 10) {
  const params = new URLSearchParams();
  if (technology) params.append('technology', technology);
  params.append('limit', limit);
  
  return apiCall(`/api/search/top-mentors?${params.toString()}`);
}

// ==================== TESTIMONIALS ====================

export async function createTestimonial(data) {
  return apiCall('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMentorTestimonials(mentorProfileId, featured = false) {
  const query = featured ? '?featured=true' : '';
  return apiCall(`/api/testimonials/mentor/${mentorProfileId}${query}`);
}

