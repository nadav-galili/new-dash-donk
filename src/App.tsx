// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LeagueDashboard from "./components/LeagueDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountSettings from "./components/AccountSettings";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/league/:leagueId"
          element={
            <ProtectedRoute>
              <LeagueDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/account" element={<Account />} />{" "}
        <Route path="/account_settings" element={<AccountSettings />} />{" "}
        {/* Add this route */}
        {/* Non-protected route */}
        <Route path="/" element={<Navigate to="/account" />} />
      </Routes>
    </Router>
  );
};

export default App;
