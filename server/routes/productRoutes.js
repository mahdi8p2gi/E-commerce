// productRouter.js
import express from "express";
import { upload } from "../configs/multer.js";
// import authSeller from "../middleware/authSeller.js";
import { addProduct, productById, productList } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.post("/add", upload.array("images"), addProduct);

productRouter.post("/list", productList);
productRouter.post("/id", productById);

export default productRouter;

