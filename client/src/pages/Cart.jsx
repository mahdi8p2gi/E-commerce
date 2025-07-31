import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    cartItem,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArray = [];
    for (const key in cartItem) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItem[key] });
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartItem) {
      getCart();
    }
  }, [products, cartItem]);

  const handleQuantityChange = (id, quantity) => {
    updateCartItem(id, Number(quantity));
  };

  const handleRemoveItem = (id) => {
    updateCartItem(id, 0);
  };

  const tax = Math.floor(getCartAmount() * 0.02 * 100) / 100;
  const total = Math.floor((getCartAmount() + tax) * 100) / 100;

  return products.length > 0 && cartItem ? (
    <div className="flex flex-col mt-16 md:flex-row">
      {/* بخش سبد خرید */}
      <div className="flex-1 max-w-4xl">
        <h1 className="mb-6 text-3xl font-medium">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">{getCartCount()}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center gap-3 md:gap-6">
              <div className="w-24 h-24 overflow-hidden border border-gray-300 rounded">
                <img
                  className="object-cover w-full h-full"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden font-semibold md:block">{product.name}</p>
                <div className="text-sm text-gray-500/70">
                  <p>Size: {product.size || "N/A"}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(product._id, e.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => handleRemoveItem(product._id)}
              className="mx-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mt-8 font-medium text-primary group"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#4fbf8b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* بخش خلاصه سفارش */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium md:text-xl">Order Summary</h2>
        <hr className="my-5 border-gray-300" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex items-start justify-between mt-2">
            <p className="text-gray-500 w-[80%]">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country} (${selectedAddress.zipcode})`
                : "No address selected"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute left-0 z-10 w-full py-1 mt-2 text-sm bg-white border border-gray-300 top-full">
                {address.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(item);
                      setShowAddress(false);
                    }}
                    className="p-2 text-gray-500 cursor-pointer hover:bg-gray-100"
                  >
                    {item.street}, {item.city}
                  </p>
                ))}
                <p className="p-2 text-center text-indigo-500 cursor-pointer hover:bg-indigo-500/10">
                  Add Address
                </p>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm font-medium uppercase">Payment Method</p>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full px-3 py-2 mt-2 bg-white border border-gray-300 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="mt-4 space-y-2 text-gray-500">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency + getCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency + tax}</span>
          </p>
          <p className="flex justify-between mt-3 text-lg font-medium">
            <span>Total Amount:</span>
            <span>{currency + total}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 font-medium text-white bg-primary hover:bg-primary-dull">
          Place Order
        </button>
      </div>
    </div>
  ) : (
    <div className="mt-20 text-center text-gray-500">Loading cart...</div>
  );
};

export default Cart;
