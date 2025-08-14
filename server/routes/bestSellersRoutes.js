// // routes/bestSellers.js
// import express from "express";
// import BestSeller from "../models/BestSeller.js";

// const router = express.Router();

// // گرفتن لیست Best Sellers
// router.get("/", async (req, res) => {
//   try {
//     const bestSellers = await BestSeller.find();
//     res.json(bestSellers);
//   } catch (error) {
//     res.status(500).json({ message: "خطا در گرفتن Best Sellers", error: error.message });
//   }
// });

// export default router;
