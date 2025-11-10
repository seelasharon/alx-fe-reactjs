import { createContext, useState } from "react";

// 1. Create context
export const UserContext = createContext();

// 2. Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    age: 30,
    bio: "Software developer from Nairobi"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
