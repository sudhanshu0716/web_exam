import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaYoutube,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import Sidebar from "./Sidebar"; // Sidebar component
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      fetchVideos();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  useEffect(() => {
    fetchVideos();
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} />

      {/* Top Bar */}
      <nav
        className="top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          marginLeft: sidebarOpen ? "200px" : "0",
          transition: "margin 0.3s ease",
        }}
      >
        <div
          className="logo-section"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <FaBars
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <FaYoutube size={32} color="red" />
          <h1>YouTube</h1>
        </div>

        <div
          className="search-bar"
          style={{
            flexGrow: 1,
            marginLeft: "2rem",
            marginRight: "2rem",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "0.5rem", width: "40%" }}
          />
          <FaSearch className="search-icon" style={{ marginLeft: "-2rem" }} />
        </div>

        <div className="auth-buttons" style={{ position: "relative" }}>
          <Link to="/upload">
            <button className="upload-btn">Upload</button>
          </Link>

          {isLoggedIn ? (
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              style={{
                display: "inline-block",
                marginLeft: "1rem",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <FaUserCircle
                size={28}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  alignItems: "center",
                }}
              />

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    padding: "0.5rem 1rem",
                    zIndex: 1000,
                    borderRadius: "6px",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="upload-btn" style={{ marginLeft: "1rem" }}>
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Video List */}
      <div
        className="video-list"
        style={{
          marginLeft: sidebarOpen ? "200px" : "0",
          transition: "margin 0.3s ease",
          padding: "1rem",
        }}
      >
        <div
          className="videos-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="video-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Link to={`/watch/${video._id}`} style={{ textDecoration: "none" }}>
                <img
                  src={video.thumbnailUrl || "https://via.placeholder.com/320x180"}
                  alt={video.title}
                  className="thumbnail"
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <div style={{ padding: "0.5rem" }}>
                  <h4 style={{ color: "#000", fontSize: "1rem" }}>{video.title}</h4>
                </div>
              </Link>

              {isLoggedIn && (
                <div
                  className="video-actions"
                  style={{ display: "flex", justifyContent: "space-around", padding: "0.5rem" }}
                >
                  <Link to={`/edit/${video._id}`}>
                    <button className="action-btn edit">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  <button
                    className="action-btn delete"
                    onClick={() => deleteVideo(video._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoList;
