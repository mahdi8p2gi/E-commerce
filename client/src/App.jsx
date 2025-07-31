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
import addAddress from "./pages/addAddress";

function App() {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin } = useAppContext();

  return (
    <div>
      {!isSellerPath && <Navbar />}
      {showUserLogin ? <Login /> : null}

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/add-address" element={<addAddress />} />

        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
