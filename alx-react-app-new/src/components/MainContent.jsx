function MainContent() {
    return (
        <main style={{
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            margin: '1rem 0',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <p style={{
                fontSize: '1.2rem',
                color: '#333',
                fontFamily: 'Arial, sans-serif',
                margin: 0
            }}>I love to visit New York, Paris, and Tokyo.</p>
        </main>
    );
}

export default MainContent;