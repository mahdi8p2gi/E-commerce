import Comment from "../models/Comments.js";

// =======================
export const getComments = async (req, res) => {
  try {
    const { productId } = req.params; // ✅ همین نام باید با router مطابقت داشته باشه
    if (!productId)
      return res.status(400).json({ error: "Product ID is required" });

    const comments = await Comment.find({ productId }).sort({ createdAt: -1 });

    if (!comments.length) {
      return res.json({
        comments: [],
        message: "There is no commets for this product yet:("
      });
    }

    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching comments" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { productId, user, text } = req.body;
    if (!productId || !user || !text)
      return res
        .status(400)
        .json({ error: "productId, user, and text are required" });

    const comment = new Comment({ productId, user, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while adding comment" });
  }
};

// =======================
// POST ثبت ریپلای روی کامنت
// =======================
export const addReply = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const { user, text } = req.body;

    if (!user || !text)
      return res.status(400).json({ error: "user and text are required" });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    comment.replies.push({ user, text });
    await comment.save();

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while adding reply" });
  }
};

// =======================
// POST لایک کامنت
// =======================
export const likeComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while liking comment" });
  }
};

// =======================
// POST دیس‌لایک کامنت
// =======================
export const dislikeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while disliking comment" });
  }
};
