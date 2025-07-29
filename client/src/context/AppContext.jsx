import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

// ایجاد کانتکست
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = process.env.REACT_APP_CURRENCY || "$";

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // ✅ اصلاح نام تابع
  // AppContext.js
const [selectedCategory, setSelectedCategory] = useState("");


  // گرفتن محصولات ساختگی (شبیه‌سازی API)
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // افزودن محصول به سبد خرید
  const addToCart = (itemID) => {
    const cartData = structuredClone(cartItem);
    if (cartData[itemID]) {
      cartData[itemID] += 1;
    } else {
      cartData[itemID] = 1;
    }
    setCartItem(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemID, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemID] = quantity;
    setCartItem(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemID) => {
    let cartData = structuredClone(cartItem);
    if (cartData[itemID]) {
      cartData[itemID] -= 1;
      if (cartData[itemID] === 0) {
        delete cartData[itemID];
      }
      setCartItem(cartData);
      toast.success("Removed from cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const value = {
  navigate,
  user,
  setUser,
  isSeller,
  setIsSeller,
  showUserLogin,
  setShowUserLogin,
  products,
  currency,
  cartItem,
  addToCart,
  updateCartItem,
  removeFromCart,
  searchQuery,
  setSearchQuery, // ✅ درست شد
  selectedCategory,
  setSelectedCategory,
};


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
