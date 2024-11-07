import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";
import Main from "./components/Main";
import ProtectedRoute from "./components/ProtectedRoute";

import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <MainApp isAuthenticated={isAuthenticated} />
    </Router>
  );
}

function MainApp({ isAuthenticated }) {
  return (
    <>
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
