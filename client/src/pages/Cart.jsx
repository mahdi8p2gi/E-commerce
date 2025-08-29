import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItem,
    updateCartItem,
    getCartCount,
    getCartAmount,
    navigate,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ساخت آرایه cartArray بر اساس cartItem
  useEffect(() => {
    if (products.length && cartItem) {
      const tempArray = Object.entries(cartItem)
        .map(([id, quantity]) => {
          const product = products.find((p) => p._id === id);
          if (product) return { ...product, quantity };
          return null;
        })
        .filter(Boolean);
      setCartArray(tempArray);
    }
  }, [products, cartItem]);

  const handleQuantityChange = (id, quantity) => {
    updateCartItem(id, Number(quantity));
  };

  const handleRemoveItem = (id) => {
    updateCartItem(id, 0);
    toast.success("Product removed from cart");
  };

  const tax = +(getCartAmount() * 0.02).toFixed(2);
  const total = +(getCartAmount() + tax).toFixed(2);

  if (!cartArray.length) {
    return (
      <div className="mt-20 text-center text-gray-500 text-lg font-medium">
        Your cart is empty :(
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 mt-16 px-4 lg:px-0">
      {/* Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold flex items-center justify-between">
          Shopping Cart
          <span className="text-sm text-primary">{getCartCount()}</span>
        </h1>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium text-sm md:text-base border-b border-gray-300 pb-2">
          <span>Product Details</span>
          <span className="text-center">Subtotal</span>
          <span className="text-center">Action</span>
        </div>

        {/* Cart Items List */}
        <div className="flex flex-col gap-4">
          {cartArray.map((product) => (
            <div
              key={product._id}
              className="grid md:grid-cols-[2fr_1fr_1fr] items-center gap-4 py-4 border-b border-gray-200 text-gray-700"
            >
              <div className="flex items-center gap-4">
                <div
                  onClick={() =>
                    navigate(`/products/${product.category}/${product._id}`)
                  }
                  className="w-20 h-20 md:w-24 md:h-24 overflow-hidden border rounded cursor-pointer flex-shrink-0"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold truncate md:block">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-gray-500/80">
                    <span>Size: {product.size || "N/A"}</span>
                    <div className="flex items-center gap-1">
                      <span>Qty:</span>
                      <select
                        className="outline-none px-2 py-1 border border-gray-300 rounded"
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

              {/* Subtotal */}
              <p className="text-center font-medium">
                {currency} {(product.offerPrice * product.quantity).toFixed(2)}
              </p>

              {/* Remove Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleRemoveItem(product._id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mt-6 font-medium text-primary hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="max-w-md w-full bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {/* Delivery Address */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase">Delivery Address</span>
          <div className="relative">
            <p className="text-gray-600">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country} (${selectedAddress.zipcode})`
                : "No address selected"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline text-sm mt-1"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg text-sm">
                {address.map((item, idx) => (
                  <p
                    key={idx}
                    onClick={() => {
                      setSelectedAddress(item);
                      setShowAddress(false);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {item.street}, {item.city}
                  </p>
                ))}
                <p className="px-3 py-2 text-center text-primary cursor-pointer hover:bg-primary/10">
                  Add Address
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase">Payment Method</span>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-white"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Price Summary */}
        <div className="border-t border-gray-300 pt-4 flex flex-col gap-2 text-gray-700">
          <div className="flex justify-between">
            <span>Price</span>
            <span>{currency + getCartAmount()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency + tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2">
            <span>Total Amount:</span>
            <span>{currency + total}</span>
          </div>
        </div>

        <button className="w-full py-3 mt-4 font-medium text-white rounded bg-primary hover:bg-primary-dull transition-all">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
