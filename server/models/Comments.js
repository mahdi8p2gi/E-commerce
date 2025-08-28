import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  productId: String,
  user: String,
  text: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },      // آرایه IPهایی که لایک کرده‌اند
  dislikedBy: { type: [String], default: [] },   // آرایه IPهایی که دیس‌لایک کرده‌اند
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);
