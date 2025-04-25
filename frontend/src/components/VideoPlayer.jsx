import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './VideoPlayer.css'

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false); 
  const [disliked, setDisliked] = useState(false); 
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
        setLikes(res.data.likes || 0);
        setDislikes(res.data.dislikes || 0);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchVideo();
  }, [id]);

  const getYouTubeEmbedUrl = (url) => {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1); // Decrease like count
    } else {
      setLikes(likes + 1); // Increase like count
    }
    setLiked(!liked); // Toggle the like status
    
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1); // Decrease dislike count
    } else {
      setDislikes(dislikes + 1); // Increase dislike count
    }
    setDisliked(!disliked); // Toggle the dislike status
    
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    // Optionally: axios.post(`/api/subscribe/${video.uploader}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Video URL copied to clipboard!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = video.videoUrl;
    link.download = `${video.title}.mp4`;
    link.click();
  };

  if (!video) return <p>Loading...</p>;

  const isYouTubeLink =
    video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be");

  return (
    <div className="video-player" style={{ padding: "2rem" }}>
      <Link style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  alignItems: "center",
                  color:'white',
                  textDecoration:'none'
                }} to="/">⬅ go Back </Link>
      <h2>{video.title}</h2>

      {isYouTubeLink ? (
        <iframe
          width="75%"
          height="500"
          src={getYouTubeEmbedUrl(video.videoUrl)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={video.title}
        ></iframe>
      ) : (
        <video width="75%" height="500" controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <p style={{ marginTop: "1rem" }}>{video.description}</p>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button onClick={handleSubscribe} disabled={subscribed}>
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>

        <button onClick={handleLike} style={{ color: liked ? "blue" : "black" }}>
          👍 {likes}
        </button>
        <button onClick={handleDislike} style={{ color: disliked ? "red" : "black" }}>
          👎 {dislikes}
        </button>

        <button onClick={handleShare}>🔗 Share</button>
        <button onClick={handleDownload}>⬇️ Download</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
