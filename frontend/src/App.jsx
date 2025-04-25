import { Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import VideoList from "./components/VideoList";
import VideoPlayer from "./components/VideoPlayer";
import EditForm from "./components/EditForm";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VideoList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Route */}
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <UploadForm />
          </PrivateRoute>
        }
      />

      <Route path="/watch/:id" element={<VideoPlayer />} />
      <Route path="/edit/:id" element={<EditForm />} />
    </Routes>
  );
}

export default App;
