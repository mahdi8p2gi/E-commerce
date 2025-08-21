import express from "express";
import authUser from "../middleware/authUser.js";
import { getUserOrders, placeOrderCOD, getAllOrders } from "../controllers/orderController.js";
import authSeller from "../middleware/authSeller.js";

const orderRouter = express.Router()

orderRouter.post('/cod' , authUser , placeOrderCOD)
orderRouter.get('/cod' , authUser , getUserOrders)
orderRouter.get('/cod' , authSeller , getAllOrders)


export default orderRouter