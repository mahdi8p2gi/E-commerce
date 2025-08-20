import express from "express";
import {
  register,
  login,
  updateProfile

} from "../controllers/UserControllers.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);



router.put("/profile", updateProfile);

export default router;
