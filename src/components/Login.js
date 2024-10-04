import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Login.tsx
import { useState } from "react";
import { apiRequest } from "../api/apiService";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Here you would call your login API
            const data = await apiRequest({
                url: "/api/admin/adminLogin",
                method: "post",
                data: { userName: username, password },
            });
            // Save the token to localStorage
            if (data.admin && data.admin.token) {
                localStorage.setItem("adminAuthToken", data.admin.token);
                setMessage(`Welcome, ${data.admin.username}!`);
                navigate("/dashboard");
            }
        }
        catch (error) {
            setMessage("Login failed. Please check your credentials.");
            console.error("Error:", error);
        }
    };
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-sm", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 text-center mb-6", children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500", required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors", children: "Login" })] }), message && _jsx("p", { className: "mt-4 text-center text-red-500", children: message })] }) }));
};
export default Login;
