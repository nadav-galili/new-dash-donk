import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import httpClient from "../api/httpClient";

const AccountSettings: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state as { user: any };

  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //if localstrorage dont have xToken, redirect to login page
  if (!localStorage.getItem("xToken")) {
    navigate("/Account");
  }

  const handleDeleteRequest = async () => {
    try {
      if (!user.id) {
        setError(
          "Failed to delete your data. Please try again or contact us at nadavg1000@gmail.com"
        );
        return;
      }
      const response = await httpClient.delete(
        `/api/users/deleteAccount/${user.id}`
      );

      if (response?.data?.message === "User deleted.") {
        alert("Your data has been deleted successfully.");
        navigate("/account"); // Redirect to account page after deletion
      } else {
        setError(
          "Failed to delete your data. Please try again or contact us at nadavg1000@gmail.com"
        );
      }
    } catch (error) {
      console.error("Error deleting user data:", error);
      setError("An error occurred while trying to delete your data.");
    }
  };

  const handleDeleteButtonClick = () => {
    setShowPrompt(true);
  };

  const handlePromptClose = (confirmed: boolean) => {
    setShowPrompt(false);
    if (confirmed) {
      handleDeleteRequest();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>
          <strong>Name:</strong> {user.nickName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p> Do you want to delete your personal data from Poker Donkey app?</p>
        <button
          onClick={handleDeleteButtonClick}
          className="bg-red-500 text-white mt-4 p-2 rounded-lg hover:bg-red-600">
          Delete
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure? this cant be undone!</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handlePromptClose(false)}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={() => handlePromptClose(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AccountSettings;
