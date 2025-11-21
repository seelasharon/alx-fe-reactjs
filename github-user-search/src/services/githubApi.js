import axios from 'axios';

// Base URL for GitHub API
const GITHUB_API_BASE_URL = 'https://api.github.com';

// Create axios instance with default config
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add API key to requests if available
const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
if (apiKey) {
  githubApi.defaults.headers.common['Authorization'] = `token ${apiKey}`;
}

/**
 * Search for GitHub users
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Results per page (default: 10)
 * @returns {Promise} API response
 */
export const searchUsers = async (query, page = 1, perPage = 10) => {
  try {
    const response = await githubApi.get('/search/users', {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search users: ${error.message}`);
  }
};

/**
 * Get user details by username
 * @param {string} username - GitHub username
 * @returns {Promise} API response
 */
export const getUser = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

/**
 * Get user repositories
 * @param {string} username - GitHub username
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Results per page (default: 10)
 * @returns {Promise} API response
 */
export const getUserRepos = async (username, page = 1, perPage = 10) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page: perPage,
        sort: 'updated',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get user repos: ${error.message}`);
  }
};

export default githubApi;

