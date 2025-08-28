import express from "express";
import {
  getComments,
  addComment,
  addReply,
  likeComment,
  dislikeComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/:productId", getComments);
router.post("/", addComment);
router.post("/:id/reply", addReply);
router.post("/:id/like", likeComment);
router.post("/:id/dislike", dislikeComment);

export default router;


