import React from "react";
import ProfilePage from "./ProfilePage";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <ProfilePage />
      </div>
    </UserProvider>
  );
}

export default App;
