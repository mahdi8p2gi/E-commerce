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
  const { showUserLogin } = useAppContext();
  const [appLoading, setAppLoading] = useState(true);

  const isSellerPath = location.pathname.startsWith("/seller");

  useEffect(() => {
    // وقتی کامپوننت mount شد، یک تایمر کوتاه می‌زنیم تا Loader برای مدتی نمایش داده شود
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 500); // یا 0 هم می‌توانید بگذارید، فقط برای جلوگیری از flicker
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) return <Loader />;

  return (
    <div className="min-h-screen text-black bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      )}

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Toaster />

        <Suspense fallback={<Loader />}>
          <Routes>
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

      {!isSellerPath && <Footer />}
      {!isSellerPath && <ChatWidget />}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
