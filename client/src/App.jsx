import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductsCategory from "./pages/ProductsCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";


function AppContent() {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin } = useAppContext();

  return (
    <div className="text-black bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
