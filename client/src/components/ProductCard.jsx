import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItem, navigate } = useAppContext();

  // ⭐ Random rating between 1 and 5
  const [rating, setRating] = useState(0);
  useEffect(() => {
    setRating(Math.floor(Math.random() * 5) + 1);
  }, []);

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer p-3 sm:p-4 w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] transition hover:shadow-md"
    >
      {/* Product Image */}
      <div className="flex items-center justify-center h-32 sm:h-36 md:h-40 lg:h-44">
        <img
          src={product.image[0]}
          alt={product.name}
          className="object-contain max-w-full max-h-full transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 sm:mt-4">
        <p className="text-xs sm:text-sm text-gray-400 capitalize">{product.category}</p>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 truncate">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < rating ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-3 sm:w-4 md:w-5"
              />
            ))}
          <p className="text-xs sm:text-sm text-gray-500">({rating})</p>
        </div>

        {/* Price and Cart Controls */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mt-3">
          <div>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-primary">
              {currency}{product.offerPrice}
              {product.offerPrice < product.price && (
                <span className="ml-2 text-xs sm:text-sm text-gray-400 line-through">
                  {currency}{product.price}
                </span>
              )}
            </p>
          </div>

          <div
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking buttons
            className="text-sm"
          >
            {!cartItem[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center gap-1 px-10  sm:px-4 py-1 sm:py-2 border rounded-md bg-primary/10 border-primary/40 text-primary text-xs sm:text-sm transition hover:bg-primary/20"
              >
                <img src={assets.cart_icon} alt="cart-icon" className="w-3 sm:w-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md bg-primary/10 text-xs sm:text-sm">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="font-bold text-primary"
                >
                  −
                </button>
                <span className="w-5 text-center font-medium">{cartItem[product._id]}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="font-bold text-primary"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
