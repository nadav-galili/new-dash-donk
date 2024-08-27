import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import logo from "../assets/appLogo.png"; // Adjust the path as needed
import { auth, provider, signInWithPopup } from "../firebaseConfig"; // Import Firebase config and type declarations
import { useNavigate } from "react-router-dom";
import httpClient from "../api/httpClient"; // Import your HTTP client
const Account = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken(); // Get the ID token from Google
            const email = result.user.email; // Get the email from the user
            // Send the ID token and email to your server
            const response = await httpClient.post("/api/google", {
                idToken: token,
                email: email,
            });
            //if response is 401, user does not exists in the app
            if (response.status === 401) {
                setError("user does not exists in the app... go to play store and download the app");
                return;
            }
            if (response.data.success) {
                console.log("User authenticated successfully");
                //save the user.token in the local storage
                localStorage.setItem("xToken", response.data.user.token);
                console.log("User token saved in local storage");
                // Redirect to the dashboard or another page
                navigate("/account_settings", { state: { user: response.data.user } });
            }
            else {
                setError("user does not exists in the app... go to play store and download the app");
            }
            // Handle response, maybe redirect to the dashboard or another page
        }
        catch (error) {
            console.error("Google Sign-In Error:", error);
            setError("An error occurred during Sign-In or user doesent exist in the app. Please try again or contact us at nadavg1000@gmail.com");
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4", children: [_jsx("img", { src: logo, alt: "App Logo", className: "w-32 h-32 mb-8" }), _jsx("h1", { className: "text-4xl font-semibold mb-4", children: "Poker Donkey App Account Settings" }), _jsx("h2", { className: "text-3xl font-semibold mb-4", children: "In here you can delete your account at the app 'Poker Donkey'" }), _jsx("h3", { className: "text-2xl font-semibold mb-4", children: "Sign in to Your Account" }), _jsxs("button", { onClick: () => handleGoogleSignIn(), className: "bg-white text-gray-800 border border-gray-300 p-2 rounded-lg flex items-center shadow-md hover:bg-gray-200 transition duration-200", children: [_jsx("img", { src: "https://img.icons8.com/color/16/000000/google-logo.png", alt: "Google Logo", className: "mr-2" }), "Sign in with Google"] }), error && _jsx("p", { className: "text-red-500 mt-4", children: error })] }));
};
export default Account;
