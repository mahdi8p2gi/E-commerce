import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// -------------------- Context Creation --------------------
export const AppContext = createContext();

// -------------------- Context Provider --------------------
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = process.env.REACT_APP_CURRENCY || "$";
  const API_URL = "http://localhost:5000";


  // -------------------- User State --------------------
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser || null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // -------------------- Product & Cart State --------------------
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // -------------------- Fetch Products --------------------
  const fetchProducts = async () => {
    try {
      console.log("Fetching products from:", `${API_URL}/api/product/list`);
      const { data } = await axios.get(`${API_URL}/api/product/list`, {
        withCredentials: true,
      });
      if (data.success && Array.isArray(data.products)) {
        // Normalize product IDs & images
        const normalizedProducts = data.products.map((p) => ({
          ...p,
          _id: p._id?.$oid || p._id || p.id,
          offerPrice: p.offerPrice ?? p.price ?? 0,
          image: Array.isArray(p.image) ? p.image : p.image ? [p.image] : [],
          category: (p.category || "").toLowerCase(),
        }));
        setProducts(normalizedProducts);
        console.log("Products fetched:", normalizedProducts.length);
      } else {
        setProducts([]);
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      setProducts([]);
      toast.error(error.message || "Failed to fetch products");
      console.error("Fetch products error:", error);
    }
  };

  // -------------------- Cart Operations --------------------
  const addToCart = (itemID) => {
    setCartItem((prev) => ({ ...prev, [itemID]: (prev[itemID] || 0) + 1 }));
    toast.success("Added to cart");
  };

  const updateCartItem = (itemID, quantity) => {
    setCartItem((prev) => {
      const next = { ...prev };
      if (quantity === 0) delete next[itemID];
      else next[itemID] = Number(quantity);
      return next;
    });
    toast.success("Cart updated");
  };

  const removeFromCart = (itemID) => {
    setCartItem((prev) => {
      const next = { ...prev };
      if (next[itemID]) {
        next[itemID] -= 1;
        if (next[itemID] === 0) delete next[itemID];
      }
      return next;
    });
    toast.success("Removed from cart");
  };

  const getCartCount = () =>
    Object.values(cartItem).reduce((acc, val) => acc + val, 0);

  const getCartAmount = () =>
    Math.floor(
      Object.entries(cartItem).reduce((total, [id, qty]) => {
        const product = products.find((p) => p._id === id);
        return product ? total + product.offerPrice * qty : total;
      }, 0) * 100
    ) / 100;

  // -------------------- Wishlist Operations --------------------
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  // -------------------- Persist User in LocalStorage --------------------
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // -------------------- Fetch Products on Mount --------------------
  useEffect(() => {
    fetchProducts();
  }, []);

  // -------------------- Sync Cart with Server --------------------
  useEffect(() => {
    const syncCart = async () => {
      if (!user) return;
      try {
        const { data } = await axios.post(
          `${API_URL}/api/cart/update`,
          { cartItems: cartItem },
          { withCredentials: true }
        );
        if (!data.success) toast.error(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };
    syncCart();
  }, [cartItem, user]);

  // -------------------- Context Value --------------------
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
    getCartCount,
    getCartAmount,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    axios,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// -------------------- Custom Hook --------------------
export const useAppContext = () => useContext(AppContext);