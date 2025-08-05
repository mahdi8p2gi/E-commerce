import express from "express";
import {
  register,
  login
 

} from "../controllers/UserControllers.js";
import { protect } from "../middleware/authUser.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB max (اختیاری)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("فقط تصاویر مجاز هستند"));
    }
  },
});

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;

