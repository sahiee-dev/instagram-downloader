import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!videoUrl) {
      setError("Please enter a video URL.");
      return;
    }

    try {
      console.log("Fetching data...");
      const url = "https://apihut.in/api/download/videos";
      const data = {
        video_url: videoUrl,
        type: "instagram",
      };

      const headers = {
        "x-avatar-key": "d00e8039-c394-4843-b24b-e51ef740eb4d",
        "Content-Type": "application/json",
      };

      const response = await axios.post(url, data, { headers });
      console.log("Response:", response.data); // Log the API response
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        setResponseData(response.data.data[0]);
        setError("");
      } else {
        setError("No data found for the provided URL.");
        setResponseData(null);
        console.error("Bug: No data found for the provided URL."); // Log bug
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch video. Please try again.");
      setResponseData(null);
      console.error("Bug: Error occurred while fetching video."); // Log bug
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Instagram Video Downloader</h1>
      <input
        type="text"
        placeholder="Enter Instagram Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ padding: "10px", width: "60%" }}
      />
      <button onClick={handleDownload} style={{ marginLeft: "10px", padding: "10px" }}>
        Download
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && responseData.thumbnail && responseData.url && (
        <div style={{ marginTop: "20px" }}>
          <h3>Video Thumbnail</h3>
          <img src={responseData.thumbnail} alt="Thumbnail" width="300px" />
          <h3>Download Video</h3>
          <a
            href={responseData.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            Click here to download
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
