// models/chat.model.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'admin'], required: true },
  message: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ChatMessage', chatSchema);
