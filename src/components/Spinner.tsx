import React from "react";
import "../Spinner.css"; // Make sure to create this CSS file for styling

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
