import React from 'react';

function MainContent() {
  return (
    <main>
      <p>I love to visit New York, Paris, and Tokyo.</p>
    </main>
  );
}

const UserProfile = (props) => {
  return (
    <main style={{
      padding: '20px',
      margin: '10px',
      backgroundColor: '#e6f2ff',
      fontFamily: 'Verdana, sans-serif',
      lineHeight: '1.6'
    }}>
      <h2 style={{ color: '#003366' }}>Welcome to the City Guide</h2>
      <p>Explore the best places, restaurants, and attractions in your favorite cities.</p>
    </main>
  );
};

export default MainContent;

