import { FaHome, FaCompass, FaBolt, FaHistory, FaVideo, FaClock } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-item"><FaHome /> <span>Home</span></div>
      <div className="sidebar-item"><FaBolt /> <span>Shorts</span></div>
      <div className="sidebar-item"><FaCompass /> <span>Explore</span></div>
      <div className="sidebar-item"><FaHistory /> <span>History</span></div>
      <div className="sidebar-item"><FaVideo /> <span>Your Videos</span></div>
      <div className="sidebar-item"><FaClock /> <span>Watch Later</span></div>
    </div>
  );
};

export default Sidebar;
