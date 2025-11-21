import axios from 'axios';

// Base URL for GitHub API
const GITHUB_API_BASE_URL = 'https://api.github.com';

// Create axios instance with default config
const githubService = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add API key to requests if available
const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
if (apiKey) {
  githubService.defaults.headers.common['Authorization'] = `token ${apiKey}`;
}

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise} API response with user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubService.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

export default githubService;

