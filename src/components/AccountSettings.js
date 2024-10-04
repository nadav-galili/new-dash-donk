import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import httpClient from "../api/httpClient";
const AccountSettings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;
    const [showPrompt, setShowPrompt] = useState(false);
    const [error, setError] = useState(null);
    //if localstrorage dont have xToken, redirect to login page
    if (!localStorage.getItem("xToken")) {
        navigate("/Account");
    }
    const handleDeleteRequest = async () => {
        try {
            if (!user.id) {
                setError("Failed to delete your data. Please try again or contact us at nadavg1000@gmail.com");
                return;
            }
            const response = await httpClient.delete(`/api/users/deleteAccount/${user.id}`);
            if (response?.data?.message === "User deleted.") {
                alert("Your data has been deleted successfully.");
                navigate("/account"); // Redirect to account page after deletion
            }
            else {
                setError("Failed to delete your data. Please try again or contact us at nadavg1000@gmail.com");
            }
        }
        catch (error) {
            console.error("Error deleting user data:", error);
            setError("An error occurred while trying to delete your data.");
        }
    };
    const handleDeleteButtonClick = () => {
        setShowPrompt(true);
    };
    const handlePromptClose = (confirmed) => {
        setShowPrompt(false);
        if (confirmed) {
            handleDeleteRequest();
        }
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Account Settings" }), _jsxs("div", { className: "bg-white shadow-md rounded-lg p-6", children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", user.nickName] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", user.email] }), _jsx("p", { children: " Do you want to delete your personal data from Poker Donkey app?" }), _jsx("button", { onClick: handleDeleteButtonClick, className: "bg-red-500 text-white mt-4 p-2 rounded-lg hover:bg-red-600", children: "Delete" }), error && _jsx("p", { className: "text-red-500 mt-4", children: error })] }), showPrompt && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Confirm Deletion" }), _jsx("p", { children: "Are you sure? this cant be undone!" }), _jsxs("div", { className: "mt-6 flex justify-end", children: [_jsx("button", { onClick: () => handlePromptClose(false), className: "mr-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400", children: "Cancel" }), _jsx("button", { onClick: () => handlePromptClose(true), className: "px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600", children: "Confirm" })] })] }) })), error && _jsx("p", { className: "text-red-500 mt-4", children: error })] }));
};
export default AccountSettings;
