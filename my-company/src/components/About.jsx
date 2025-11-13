function About() {
  return (
    <div style={{ 
      padding: 'clamp(20px, 5vw, 40px) clamp(15px, 4vw, 20px)',
      maxWidth: '900px',
      margin: '0 auto',
      minHeight: '60vh'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
        marginBottom: 'clamp(20px, 4vw, 30px)',
        color: '#333',
        borderBottom: '3px solid #667eea',
        paddingBottom: '10px'
      }}>
        About Us
      </h1>
      <p style={{ 
        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
        lineHeight: '1.8',
        color: '#555',
        marginBottom: '20px'
      }}>
        Our company has been providing top-notch services since 1990. We specialize in various fields including technology, marketing, and consultancy.
      </p>
      <div style={{
        marginTop: 'clamp(20px, 5vw, 40px)',
        padding: 'clamp(15px, 3vw, 20px)',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h2 style={{ 
          color: '#667eea', 
          marginBottom: '15px',
          fontSize: 'clamp(1.3rem, 3vw, 1.6rem)'
        }}>
          Our Mission
        </h2>
        <p style={{ 
          lineHeight: '1.8', 
          color: '#555',
          fontSize: 'clamp(0.95rem, 2.5vw, 1rem)'
        }}>
          To empower businesses with innovative solutions and exceptional service quality that drives growth and success.
        </p>
      </div>
    </div>
  );
}

export default About;

