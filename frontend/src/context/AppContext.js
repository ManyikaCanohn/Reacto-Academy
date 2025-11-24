import React, { createContext, useContext, useState } from "react";

// AppContext.js
// Simple, reusable App context for user/auth + theme + global helpers.

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  // Basic auth helpers (replace with real API calls)
  const login = async (credentials) => {
    setLoading(true);
    try {
      // placeholder: replace with actual API call
      await new Promise((r) => setTimeout(r, 600));
      const fakeUser = { id: "1", name: "Demo User", email: credentials.email };
      setUser(fakeUser);
      setIsAuthenticated(true);
      return { ok: true, user: fakeUser };
    } catch (err) {
      console.error(err);
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    loading,
    theme,
    setTheme,
    toggleTheme,
    login,
    logout,
  };

  return React.createElement(AppContext.Provider, { value }, children);
}

// custom hook for easier consumption
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
  return ctx;
}

// Optional: default export for convenience
export default AppContext;
