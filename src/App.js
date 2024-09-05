import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LeagueDashboard from "./components/LeagueDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountSettings from "./components/AccountSettings";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/league/:leagueId", element: _jsx(ProtectedRoute, { children: _jsx(LeagueDashboard, {}) }) }), _jsx(Route, { path: "/privacy_policy", element: _jsx(PrivacyPolicy, {}) }), _jsx(Route, { path: "/terms_and_conditions", element: _jsx(TermsAndConditions, {}) }), _jsx(Route, { path: "/account", element: _jsx(Account, {}) }), _jsx(Route, { path: "/account_settings", element: _jsx(AccountSettings, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/account" }) })] }) }));
};
export default App;
