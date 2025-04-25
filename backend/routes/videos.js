const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// Get single video by ID
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(404).json({ error: "Video not found" });
  }
});

// Upload new video
router.post("/", async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    const saved = await newVideo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to upload video" });
  }
});

// Update video
router.put("/:id", async (req, res) => {
    try {
      const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Failed to update video" });
    }
  });
  

// Delete video
router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
});

module.exports = router;
