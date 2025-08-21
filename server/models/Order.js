import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "user" },
    items: [
      {
        product: { type: String, required: true, ref: "product" },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true, ref: "user" },
    address: { type: String, required: true, ref: "user" },
    status: { type: String, required: true, ref: "user" },
    paymentType: { type: String, required: true, ref: "user" },
    isPaid: { type: String, required: true, ref: "user" },
  },
  { timestamps: true }
);

const Order = mongoose.model.order || mongoose.model("order", orderSchema);

export default Order;
