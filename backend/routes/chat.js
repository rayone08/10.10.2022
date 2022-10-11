const express = require("express");
const Chat = require("../models/chat");

const router = express.Router();

// post new message
router.post("/new", async (req, res) => {
  const newChat = new Chat({
    chatId: req.body.chatId,
    message: req.body.message,
    arisedBy: req.body.arisedBy,
    timestamp: req.body.timestamp,
  });

  try {
    await newChat.save();
    res.status(200).json(newChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch chat based on chat id
router.get("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const requiredChat = await Chat.find({ chatId: id });
    res.status(200).json(requiredChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
