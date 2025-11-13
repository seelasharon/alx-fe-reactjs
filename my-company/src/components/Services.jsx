function Services() {
  const services = [
    { name: 'Technology Consulting', description: 'Expert guidance on technology solutions and digital transformation.' },
    { name: 'Market Analysis', description: 'Comprehensive market research and strategic insights for your business.' },
    { name: 'Product Development', description: 'End-to-end product development from concept to launch.' }
  ];

  return (
    <div style={{ 
      padding: 'clamp(20px, 5vw, 40px) clamp(15px, 4vw, 20px)',
      maxWidth: '1000px',
      margin: '0 auto',
      minHeight: '60vh'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
        marginBottom: 'clamp(25px, 5vw, 40px)',
        color: '#333',
        textAlign: 'center',
        borderBottom: '3px solid #667eea',
        paddingBottom: '10px'
      }}>
        Our Services
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 'clamp(20px, 4vw, 30px)',
        marginTop: 'clamp(20px, 4vw, 30px)'
      }}>
        {services.map((service, index) => (
          <div 
            key={index}
            style={{
              padding: 'clamp(20px, 4vw, 30px)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h2 style={{ 
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
              marginBottom: '15px',
              color: 'white'
            }}>
              {service.name}
            </h2>
            <p style={{ 
              lineHeight: '1.6',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

