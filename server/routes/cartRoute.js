
import { updateCart } from "../controllers/cartController.js";
import express from 'express'
const cartRouter = express.Router();

// Allow guest carts to update without auth
cartRouter.post("/update", updateCart);

export default cartRouter;
