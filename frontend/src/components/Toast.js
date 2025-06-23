import React from "react";

const Toast = ({ message }) => (
  <div
    style={{
      backgroundColor: "#d4edda",
      color: "var(--text-color)",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    }}
  >
    {message}
  </div>
);

export default Toast;