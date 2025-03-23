import React, { useState } from "react";
import { postDoubt } from "../services/doubtService";
import "../styles/PostDoubtForm.css";

const PostDoubtForm = ({ onDoubtPosted }) => {
  const [subject, setSubject] = useState("");
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !username || !question) {
      alert("All fields are required!");
      return;
    }

    const newDoubt = { subject, username, question };
    const result = await postDoubt(newDoubt);

    if (result) {
      onDoubtPosted(result);
      setSubject("");
      setUsername("");
      setQuestion("");
    }
  };

  return (
    <div className="post-doubt-form-container">
      <div className="post-doubt-form">
        <h3>Post a New Doubt</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            placeholder="Type your doubt here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button type="submit">Post Doubt</button>
        </form>
      </div>
    </div>
  );
};

export default PostDoubtForm;
