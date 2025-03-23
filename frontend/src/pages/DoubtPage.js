import React, { useEffect, useState } from "react";
import axios from "axios";
import DoubtCard from "../components/DoubtCard";
import PostDoubtForm from "../components/PostDoubtForm";
import "../styles/DoubtPage.css";

const DoubtPage = () => {
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/doubts/all")
      .then(response => setDoubts(response.data))
      .catch(error => console.error("Error fetching doubts:", error));
  }, []);

  const addNewDoubt = (doubt) => {
    setDoubts([doubt, ...doubts]);  
  };

  return (
    <div className="doubt-page">
      <h2>Doubt Discussion</h2>

      {}
      <div className="post-doubt-container">
        <PostDoubtForm onDoubtPosted={addNewDoubt} />
      </div>

      {}
      <div className="doubt-list">
        {doubts.map((doubt) => (
          <DoubtCard key={doubt.id} doubt={doubt} />
        ))}
      </div>
    </div>
  );
};

export default DoubtPage;
