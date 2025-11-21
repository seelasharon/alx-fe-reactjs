import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles and repositories.</p>
        <Link to="/search" className="search-link">
          Start Searching →
        </Link>
        <div className="features">
          <div className="feature-card">
            <h3>🔍 Search Users</h3>
            <p>Find GitHub users by username</p>
          </div>
          <div className="feature-card">
            <h3>👤 View Profiles</h3>
            <p>See detailed user information</p>
          </div>
          <div className="feature-card">
            <h3>📦 Browse Repositories</h3>
            <p>Explore user repositories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

