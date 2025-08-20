import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItem, navigate } = useAppContext();

  // ⭐ امتیاز رندوم بین 1 تا 5
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.floor(Math.random() * 5) + 1); // عدد بین 1 تا 5
  }, []);

  // if (!product || !product.image || !Array.isArray(product.image) || product.image.length === 0) {
  //   return null;
  // }

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="bg-white border border-gray-200 rounded-md shadow-sm cursor-pointer p-3 w-full max-w-[220px] transition hover:shadow-md"
    >
      {/* تصویر */}
      <div className="flex items-center justify-center h-32">
        <img
          src={product.image[0]}
          alt={product.name}
          className="object-contain max-w-full max-h-full transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* اطلاعات متن */}
      <div className="mt-3">
        <p className="text-xs text-gray-400 capitalize">{product.category}</p>
        <p className="text-base font-medium text-gray-800 truncate">{product.name}</p>

        {/* امتیاز */}
        <div className="flex items-center gap-1 mt-1">
          {Array(5).fill('').map((_, i) => (
            <img
              key={i}
              src={i < rating ? assets.star_icon : assets.star_dull_icon}
              alt="star"
              className="w-4"
            />
          ))}
          <p className="text-xs text-gray-500">({rating})</p>
        </div>

        {/* قیمت و دکمه‌ها */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-sm font-semibold text-primary">
              {currency}{product.offerPrice}
              <span className="ml-2 text-xs text-gray-400 line-through">
                {currency}{product.price}
              </span>
            </p>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-primary"
          >
            {!cartItem[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center gap-1 px-2 py-1 border rounded-md bg-primary/10 border-primary/40 text-primary"
              >
                <img src={assets.cart_icon} alt="cart-icon" className="w-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-primary/10">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="font-bold text-primary"
                >
                  −
                </button>
                <span className="w-5 text-sm font-medium text-center">
                  {cartItem[product._id]}
                </span>
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
