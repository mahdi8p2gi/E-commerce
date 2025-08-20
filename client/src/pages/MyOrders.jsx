import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="pb-16 mt-16">
      <div className="flex flex-col items-end mb-8 w-max">
        <p>My orders</p>
        <div className=""></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="max-w-4xl p-4 py-5 mb-10 border border-gray-300 rounded-lg"
        >
          <p className="flex justify-between text-gray-400 md:items-center md:font-medium max-md:flex-col">
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>
              Total Amount : {currency}
              {order.amount}
            </span>
          </p>

          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`relative bg-white text-500/70 ${
                order.items.length !== itemIndex + 1 ? "border-b" : ""
              } border-gray-300 flex flex-col md:flex-row md:items-center
              justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="p-4 rounded-lg bg-primary/10">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="w-16 h-16"
                  />
                </div>

                
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p>Category : {item.product.category}</p>
                </div>

                  <div className="flex flex-col justify-center mb-4 md:ml-8 md:mb-0">
                    <p>Quantity : {item.quantity || "1"}</p>
                    <p>Status : {order.status}</p>
                    <p>
                      Date :{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-us")}
                    </p>
                  </div>
              </div>
              <p className="text-lg font-medium text-primary">
                Amount : {currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
