import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            GitHub User Search
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/search" className="nav-link">Search</Link>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2025 GitHub User Search. Designed by Sharon Seela.</p>
      </footer>
    </div>
  );
}

export default Layout;

