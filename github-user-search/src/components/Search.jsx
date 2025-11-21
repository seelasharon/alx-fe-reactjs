import { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import './Search.css';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous state
    setError(null);
    setUserData(null);
    
    // Validate input
    if (!username.trim()) {
      return;
    }

    setLoading(true);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <h2>Search GitHub Users</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username..."
              className="search-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading || !username.trim()}
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="message loading-message">
            Loading...
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="message error-message">
            Looks like we cant find the user
          </div>
        )}

        {/* Success State - Display User Data */}
        {userData && !loading && !error && (
          <div className="user-card">
            <div className="user-avatar">
              <img 
                src={userData.avatar_url} 
                alt={`${userData.name || userData.login}'s avatar`}
              />
            </div>
            <div className="user-info">
              <h3 className="user-name">
                {userData.name || userData.login}
              </h3>
              {userData.name && (
                <p className="user-login">@{userData.login}</p>
              )}
              {userData.bio && (
                <p className="user-bio">{userData.bio}</p>
              )}
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-label">Followers</span>
                  <span className="stat-value">{userData.followers}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Following</span>
                  <span className="stat-value">{userData.following}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Repositories</span>
                  <span className="stat-value">{userData.public_repos}</span>
                </div>
              </div>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View GitHub Profile →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

