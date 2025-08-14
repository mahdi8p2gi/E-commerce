import { Routes, Route, useLocation ,Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts & Shared Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ChatWidget from "./components/ChatWidget";

// Context
import { useAppContext } from "./context/AppContext";

// صفحات عمومی
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductsCategory from "./pages/ProductsCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import FAQPage from "./pages/FAQ";
import MyOrders from "./pages/MyOrders";

// صفحات ادمین
import SellerLayout from "./pages/Admin/SellerLayout";
import AddProduct from "./pages/Admin/AddProduct";
import ProductList from "./pages/Admin/ProductList";
import Order from "./pages/Admin/Order";
import WishList from "./pages/WishList";

function AppContent() {
  const location = useLocation();
  const { showUserLogin } = useAppContext();

  // اگر مسیر شامل /seller بود، فرض بگیر پنل ادمین است
  const isSellerPath = location.pathname.startsWith("/seller");

  return (
    <div className="min-h-screen text-black bg-white">
      {/* Navbar فقط در صفحات عمومی */}
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}

      {/* محتوای صفحات */}
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Toaster />

        <Routes>
          {/* مسیرهای کاربران عادی */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<WishList />} />


          {/* مسیرهای پنل فروشنده (ادمین) */}
          <Route path="/seller-layout" element={<SellerLayout />}>
          <Route index element={<Navigate to="add-product" replace />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products-list" element={<ProductList />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Routes>
      </div>

      {/* Footer و ChatBot فقط در صفحات عمومی */}
      {!isSellerPath && <Footer />}
      {!isSellerPath && <ChatWidget />}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
