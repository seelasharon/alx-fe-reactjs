import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

function App() {
  // This is the data you want to share across components
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // ✅ Wrap your main component with the Provider
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
