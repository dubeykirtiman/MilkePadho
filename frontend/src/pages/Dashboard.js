import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import DoubtCard from "../components/DoubtCard";
import { fetchDoubts } from "../services/doubtService";

const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadDoubts = async () => {
      setLoading(true);
      const data = await fetchDoubts();
      setDoubts(data);
      setLoading(false);
    };
    loadDoubts();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">📌 Doubts Dashboard</h1>

      <div className="subject-selector">
        <label>Select Subject:</label>
        <select
          onChange={(e) => setSelectedSubject(e.target.value)}
          value={selectedSubject}
          className="subject-dropdown"
        >
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Maths">Maths</option>
          <option value="Biology">Biology</option>
          <option value="Computer">Computer</option>
        </select>
      </div>

      {}
      <button className="goto-doubts-button" onClick={() => navigate("/doubts")}>
        ➕ Post a New Doubt
      </button>

      {loading ? (
        <p>Loading doubts...</p>
      ) : (
        <div className="doubts-list">
          {doubts.filter((doubt) => doubt.subject.trim().toLowerCase() === selectedSubject.toLowerCase()).length === 0 ? (
            <p>No doubts available for {selectedSubject}.</p>
          ) : (
            doubts
              .filter((doubt) => doubt.subject.trim().toLowerCase() === selectedSubject.toLowerCase())
              .map((doubt) => <DoubtCard key={doubt.id} doubt={doubt} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
