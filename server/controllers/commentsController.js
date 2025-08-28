import Comment from "../models/Comments.js";

/**
 * Get all comments for a product
 * GET /api/comments/:productId
 */
export const getComments = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) return res.status(400).json({ error: "Product ID is required" });

    const comments = await Comment.find({ productId }).sort({ createdAt: -1 });

    if (comments.length === 0) {
      return res.json({
        comments: [],
        message: "There are no comments for this product yet 😔",
      });
    }

    return res.json({ comments });
  } catch (error) {
    console.error("Get comments error:", error);
    return res.status(500).json({ error: "Server error while fetching comments" });
  }
};

/**
 * Add a new comment
 * POST /api/comments
 */
export const addComment = async (req, res) => {
  try {
    const { productId, user, text } = req.body;
    if (!productId || !user || !text) {
      return res.status(400).json({ error: "productId, user, and text are required" });
    }

    const comment = new Comment({ productId, user, text });
    await comment.save();

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Add comment error:", error);
    return res.status(500).json({ error: "Server error while adding comment" });
  }
};

/**
 * Add a reply to a comment
 * POST /api/comments/:id/reply
 */
export const addReply = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const { user, text } = req.body;

    if (!user || !text) return res.status(400).json({ error: "user and text are required" });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    comment.replies.push({ user, text });
    await comment.save();

    return res.json(comment);
  } catch (error) {
    console.error("Add reply error:", error);
    return res.status(500).json({ error: "Server error while adding reply" });
  }
};

/**
 * Like a comment
 * POST /api/comments/:id/like
 */
export const likeComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    return res.json(comment);
  } catch (error) {
    console.error("Like comment error:", error);
    return res.status(500).json({ error: "Server error while liking comment" });
  }
};

/**
 * Dislike a comment
 * POST /api/comments/:id/dislike
 */
export const dislikeComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    return res.json(comment);
  } catch (error) {
    console.error("Dislike comment error:", error);
    return res.status(500).json({ error: "Server error while disliking comment" });
  }
};
