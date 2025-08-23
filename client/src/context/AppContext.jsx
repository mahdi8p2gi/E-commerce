import { createContext, useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = process.env.REACT_APP_CURRENCY || "$";

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser || null);

  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // مقدار اولیه products آرایه خالی است تا filter همیشه کار کند
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [wishlist, setWishlist] = useState([]);

  // بارگذاری اولیه محصولات
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/product/list");
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]); // اگر داده‌ها مشکل داشت، حداقل آرایه خالی بگذار
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      setProducts([]);
      toast.error(error.message || "Failed to fetch products");
    }
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

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItem) {
      totalCount += cartItem[item];
    }
    return totalCount;
  };

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

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item._id === product._id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

  // بارگذاری محصولات در ابتدا
  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post('api/cart/update', { cartItems: cartItem })
        if (!data.success) {
          toast.error(data.message)
        }
      } catch (error) {
          toast.error(error.message)

      }

    }
    if(user) {updateCart()}
  }, [cartItem])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products, // همیشه آرایه، هرگز undefined
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
    wishlist,
    addToWishlist,
    removeFromWishlist,
    axios,
    fetchProducts
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
