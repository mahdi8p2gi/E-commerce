import express from "express";
import {
  register,
  login,
  updateProfile,
  listUsers,
  toggleBanUser

} from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/list", listUsers);
router.post("/ban", toggleBanUser);
router.put("/profile", updateProfile);

export default router;
