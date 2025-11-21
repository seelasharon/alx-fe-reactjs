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

/**
 * Advanced search for GitHub users with multiple criteria
 * Uses GitHub Search API: https://api.github.com/search/users?q={query}
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.query - Username or name to search for
 * @param {string} searchParams.location - Location filter (optional)
 * @param {number} searchParams.minRepos - Minimum number of repositories (optional)
 * @param {number} searchParams.page - Page number (default: 1)
 * @param {number} searchParams.perPage - Results per page (default: 30, max: 100)
 * @returns {Promise} API response with search results
 */
export const searchUsersAdvanced = async (searchParams) => {
  try {
    const { query, location, minRepos, page = 1, perPage = 30 } = searchParams;
    
    // Build the search query string for GitHub Search API
    // GitHub Search API format: https://api.github.com/search/users?q={query}
    let searchQuery = query || '';
    
    // Add location filter if provided
    if (location && location.trim()) {
      searchQuery += ` location:${location.trim()}`;
    }
    
    // Add minimum repositories filter if provided
    if (minRepos && minRepos > 0) {
      searchQuery += ` repos:>=${minRepos}`;
    }
    
    // If no query provided, use type:user to search all users
    if (!query || !query.trim()) {
      searchQuery = 'type:user' + (location ? ` location:${location.trim()}` : '') + (minRepos ? ` repos:>=${minRepos}` : '');
    }
    
    // Construct the full URL: https://api.github.com/search/users?q={query}
    const endpoint = '/search/users';
    const params = {
      q: searchQuery.trim(),
      page,
      per_page: Math.min(perPage, 100), // GitHub API max is 100
      sort: 'repositories', // Sort by number of repositories
      order: 'desc',
    };
    
    // Make request to: https://api.github.com/search/users?q={query}&page={page}&per_page={perPage}&sort=repositories&order=desc
    const response = await githubService.get(endpoint, { params });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw new Error('Invalid search parameters');
    }
    throw new Error(`Failed to search users: ${error.message}`);
  }
};

/**
 * Fetch detailed user data for multiple users
 * @param {Array<string>} usernames - Array of GitHub usernames
 * @returns {Promise<Array>} Array of user data
 */
export const fetchMultipleUsers = async (usernames) => {
  try {
    const promises = usernames.map(username => 
      fetchUserData(username).catch(() => null) // Return null for failed requests
    );
    const results = await Promise.all(promises);
    return results.filter(user => user !== null); // Filter out failed requests
  } catch (error) {
    throw new Error(`Failed to fetch multiple users: ${error.message}`);
  }
};

export default githubService;

