import { useState, useEffect } from 'react';
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Order = () => {
    const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";
const API_URL = process.env.REACT_APP_API_URL;
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/order/seller`);
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-4 space-y-4 md:p-10">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
                    >
                        <div className="flex gap-5">
                            <img
                                className="object-cover w-12 h-12 opacity-60"
                                src={boxIcon}
                                alt="boxIcon"
                            />
                            <div>
                                {order.items.map((item, idx) => (
                                    <p key={idx} className="font-medium">
                                        {item.product?.name}{" "}
                                        <span
                                            className={`text-indigo-500 ${item.quantity < 2 ? "hidden" : ""}`}
                                        >
                                            x {item.quantity}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="text-sm">
                            <p className="mb-1 font-medium">
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <p>
                                {order.address.street}, {order.address.city},{" "}
                                {order.address.state}, {order.address.zipcode},{" "}
                                {order.address.country}
                            </p>
                        </div>

                        <p className="my-auto text-base font-medium text-black/70">
                            {currency}{order.amount}
                        </p>

                        <div className="flex flex-col text-sm">
                            <p>Method: {order.paymentType}</p>
                            <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Order;
