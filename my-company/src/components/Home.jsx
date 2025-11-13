function Home() {
  return (
    <div style={{ 
      padding: 'clamp(20px, 5vw, 40px) clamp(15px, 4vw, 20px)', 
      textAlign: 'center',
      minHeight: '60vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(1.8rem, 6vw, 3rem)', 
        marginBottom: 'clamp(15px, 3vw, 20px)',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        padding: '0 clamp(10px, 3vw, 20px)'
      }}>
        Welcome to Our Company
      </h1>
      <p style={{ 
        fontSize: 'clamp(1rem, 3vw, 1.3rem)', 
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.6',
        padding: '0 clamp(10px, 3vw, 20px)'
      }}>
        We are dedicated to delivering excellence in all our services.
      </p>
    </div>
  );
}

export default Home;

