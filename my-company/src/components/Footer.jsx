function Footer() {
  return (
    <footer style={{
      background: '#333',
      color: 'white',
      padding: '30px 20px',
      marginTop: 'auto',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{ 
          margin: '10px 0',
          fontSize: '1rem'
        }}>
          © 2024 My Company. All rights reserved.
        </p>
        <p style={{ 
          margin: '10px 0',
          fontSize: '0.9rem',
          color: '#aaa'
        }}>
          Providing excellence since 1990
        </p>
      </div>
    </footer>
  );
}

export default Footer;

