import axios from "axios";

const BASE_URL = "https://api.github.com/users";

// Optional: use your API key if you hit rate limits
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const fetchGitHubUser = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`, {
      headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
};
