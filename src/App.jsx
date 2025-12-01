import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import initialData from "./data/bookmarks.json";

const AUTH_KEY = "rb_user_auth";
const BOOKMARKS_KEY = "rb_data_v1";

export default function App() {
  // Check login session
  const [user, setUser] = useState(() => {
    return localStorage.getItem(AUTH_KEY) ? { username: "admin" } : null;
  });

  // Load bookmarks (localStorage → file fallback)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) return JSON.parse(saved);

    return Array.isArray(initialData) ? initialData : [];
  });

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks, null, 2));
  }, [bookmarks]);

  // Handle login
  function handleLogin(username) {
    localStorage.setItem(AUTH_KEY, username);
    setUser({ username });
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {user ? (
        <Dashboard
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          onLogout={handleLogout}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
