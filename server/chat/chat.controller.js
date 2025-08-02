// controllers/chat.controller.js
import ChatMessage from './chat.model.js';

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sender, message, userId } = req.body;

    if (!message || !sender || !userId) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newMessage = new ChatMessage({ sender, message, userId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Send failed' });
  }
};
