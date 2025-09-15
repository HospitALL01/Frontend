import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import AI from "./AI"; // Importing the AI component for chat

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false); // State to toggle chat visibility

  // Toggle chat window visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      {/* Chat Widget Button - Floating button to open chat */}
      <button
        className="chat-widget-btn"
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "50%",
          padding: "15px",
          border: "none",
          fontSize: "24px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        <FaComments />
      </button>

      {/* Chat Window - Visible when showChat is true */}
      {showChat && (
        <div
          className="chat-window"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px", // Increased width
            height: "500px", // Set height for better user experience
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px", // Rounded corners
            zIndex: 1000,
            padding: "10px", // Padding for better spacing
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* The AI component */}
          <AI user={{}} />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
