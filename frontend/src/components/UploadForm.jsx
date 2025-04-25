import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/videos", video);
      navigate("/");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={video.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Video Description"
          value={video.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={video.videoUrl}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={video.thumbnailUrl}
          onChange={handleChange}
        />
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
};

export default UploadForm;
