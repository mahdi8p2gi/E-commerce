// productRouter.js
import express from "express";
import { upload } from "../configs/multer.js";
// import authSeller from "../middleware/authSeller.js";
import { addProduct, productById, productList } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.post("/add", upload.array(["images"]), addProduct);
productRouter.get("/list", productList);
productRouter.get("/id", productById);

export default productRouter;
