import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'background 0.3s ease',
    display: 'block',
    width: '100%',
    textAlign: 'center'
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(10px, 3vw, 20px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: 'bold',
          color: 'white'
        }}>
          My Company
        </div>
        
        {/* Hamburger Menu Button for Mobile */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: 'clamp(15px, 3vw, 30px)',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              About
            </Link>
            <Link 
              to="/services" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          width: '100%',
          background: 'rgba(102, 126, 234, 0.95)',
          padding: '20px 0',
          marginTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '0 clamp(10px, 3vw, 20px)'
          }}>
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={linkStyle}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={linkStyle}
            >
              About
            </Link>
            <Link 
              to="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={linkStyle}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={linkStyle}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

