
import { updateCart } from "../controllers/cartController.js";
import express from 'express'
const cartRouter = express.Router();


cartRouter.post("/update", updateCart);

export default cartRouter;
