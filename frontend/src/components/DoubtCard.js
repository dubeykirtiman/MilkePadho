import React from "react";
import "../styles/DoubtCard.css";

const DoubtCard = ({ doubt }) => {
  if (!doubt || !doubt.subject || !doubt.username || !doubt.question) {
    return null;
  }

  return (
    <div className="doubt-card">
      <h3>{doubt.subject}</h3>
      <p><strong>{doubt.username}:</strong> {doubt.question}</p>
    </div>
  );
};

export default DoubtCard;
