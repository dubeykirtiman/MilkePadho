import axios from "axios";

const API_URL = "http://localhost:8080/api/doubts";

export const fetchDoubts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    console.log("Fetched Doubts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching doubts:", error);
    return [];
  }
};

export const postDoubt = async (doubt) => {
  try {
    
    doubt.subject = doubt.subject.trim();
    
    const response = await axios.post(`${API_URL}/post`, doubt);
    console.log("Posted Doubt:", response.data); 
  } catch (error) {
    console.error("Error posting doubt:", error);
    return null;
  }
};
