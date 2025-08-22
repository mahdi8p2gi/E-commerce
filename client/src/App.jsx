import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState, lazy, Suspense } from "react";

// Layouts & Shared Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ChatWidget from "./components/ChatWidget";

// Context
import { useAppContext } from "./context/AppContext";

// صفحات عمومی (Lazy Loaded)
const Home = lazy(() => import("./pages/Home"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductsCategory = lazy(() => import("./pages/ProductsCategory"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const WishList = lazy(() => import("./pages/WishList"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

// صفحات ادمین (Lazy Loaded)
const SellerLayout = lazy(() => import("./pages/Admin/SellerLayout"));
const AddProduct = lazy(() => import("./pages/Admin/AddProduct"));
const ProductList = lazy(() => import("./pages/Admin/ProductList"));
const Order = lazy(() => import("./pages/Admin/Order"));
const Login = lazy(() => import("./components/Login"));

function AppContent() {
  const location = useLocation();
  const { showUserLogin, isLoading } = useAppContext();

  const isSellerPath = location.pathname.startsWith("/seller");
  
  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen text-black bg-white">
      {/* Navbar فقط در صفحات عمومی */}
      {!isSellerPath && <Navbar />}
      {showUserLogin && (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      )}

      {/* محتوای صفحات */}
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Toaster />

        <Suspense fallback={<Loader />}>
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
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            {/* مسیرهای پنل فروشنده (ادمین) */}
            <Route path="/seller-layout" element={<SellerLayout />}>
              <Route index element={<Navigate to="add-product" replace />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products-list" element={<ProductList />} />
              <Route path="orders" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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
