import { createContext, useState } from "react";

export const UserContext = createContext({ name: "", auth: false });

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "", auth: false });

  const login = (email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser({
      email,
      auth: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({ name: "", auth: false });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
