import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("adminAuthToken");
    if (!token) {
        // If no token, redirect to login page
        return _jsx(Navigate, { to: "/login" });
    }
    // If token exists, render the protected component
    return children;
};
export default ProtectedRoute;
