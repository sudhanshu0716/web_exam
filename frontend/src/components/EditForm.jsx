import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams(); // Extract the video ID from the route
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  // Fetch video details when the component is mounted
  useEffect(() => {
    const loadVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video details:", error);
        alert("Unable to fetch video details. Please try again later.");
      }
    };

    loadVideoDetails();
  }, [id]);

  // Update state when form inputs change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for updating video details
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting updated video data:", videoData); // Debugging log

    try {
      const response = await axios.put(`http://localhost:5000/api/videos/${id}`, videoData);
      console.log("Video updated successfully:", response.data);
      alert("Video updated successfully!");
      navigate("/"); // Redirect to the homepage after a successful update
    } catch (error) {
      console.error("Error updating video:", error.response?.data || error.message);
      alert("Failed to update video. Check the console for more details.");
    }
  };

  return (
    <div className="edit-form">
      <h2>Update Video</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={videoData.title}
          onChange={handleInputChange}
          placeholder="Enter video title"
          required
        />
        <textarea
          name="description"
          value={videoData.description}
          onChange={handleInputChange}
          placeholder="Enter video description"
          required
        />
        <input
          type="text"
          name="videoUrl"
          value={videoData.videoUrl}
          onChange={handleInputChange}
          placeholder="Enter video URL"
          required
        />
        <input
          type="text"
          name="thumbnailUrl"
          value={videoData.thumbnailUrl}
          onChange={handleInputChange}
          placeholder="Enter thumbnail URL"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;