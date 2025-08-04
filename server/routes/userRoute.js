import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/UserControllers.js";
import { protect } from "../middleware/authUser.js";
import multer from "multer";

// پیکربندی multer برای آپلود عکس پروفایل
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/me", protect, getMe);
router.put("/update", protect, upload.single("profileImage"), updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete", protect, deleteAccount);

export default router;
