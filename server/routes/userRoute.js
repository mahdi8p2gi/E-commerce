import express from "express";
import { register } from "../controllers/UserControllers.js";

const userRouter = express.Router();

userRouter.post("/register", register);
// userRouter.post("/login", login);

export default userRouter;
