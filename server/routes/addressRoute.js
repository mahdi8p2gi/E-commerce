import express from "express";
import authUser from "../middleware/authUser.js";
import { addAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/get", authUser, addAddress);

export default addressRouter;


