import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

// ایجاد کانتکست
export const AppContext = createContext();

// Provider برای کل اپ
export const AppContextProvider = ({ children }) => {
  const url = "https://e-commerce-backend-0zqg.onrender.com"
  const navigate = useNavigate();
  const currency = process.env.REACT_APP_CURRENCY || "$";

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser || null);

  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // شبیه‌سازی گرفتن محصولات از API
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // افزودن به سبد خرید
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

  // بروزرسانی تعداد یک آیتم
  const updateCartItem = (itemID, quantity) => {
    const cartData = structuredClone(cartItem);
    if (quantity === 0) {
      delete cartData[itemID];
    } else {
      cartData[itemID] = quantity;
    }
    setCartItem(cartData);
    toast.success("Cart updated");
  };

  // حذف یک آیتم از سبد
  const removeFromCart = (itemID) => {
    const cartData = structuredClone(cartItem);
    if (cartData[itemID]) {
      cartData[itemID] -= 1;
      if (cartData[itemID] === 0) {
        delete cartData[itemID];
      }
      setCartItem(cartData);
      toast.success("Removed from cart");
    }
  };

  // جمع کل تعداد محصولات سبد
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItem) {
      totalCount += cartItem[item];
    }
    return totalCount;
  };

  // جمع قیمت کل سبد خرید
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      const itemInfo = products.find((p) => p._id === item);
      if (itemInfo && cartItem[item] > 0) {
        totalAmount += itemInfo.offerPrice * cartItem[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // ذخیره user در localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // بارگذاری اولیه محصولات
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
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getCartAmount,
    getCartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// هوک اختصاصی برای استفاده راحت از کانتکست
export const useAppContext = () => useContext(AppContext);
