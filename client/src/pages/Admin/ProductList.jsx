import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { productAdded } = useOutletContext();
  const { currency, fetchProducts, products } = useAppContext();
const API_URL = process.env.REACT_APP_API_URL;
  // Filters
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all"); // all | in | out
  const [priceSort, setPriceSort] = useState("none"); // none | asc | desc

  useEffect(() => {
    fetchProducts();
  }, [productAdded]);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/product/stock`, { id, inStock })
      if (data.success) {
        fetchProducts()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach(p => {
      if (p?.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let list = Array.isArray(products) ? [...products] : [];

    if (categoryFilter !== "all") {
      list = list.filter(p => (p.category || "").toLowerCase() === categoryFilter.toLowerCase());
    }

    if (stockFilter !== "all") {
      list = list.filter(p => stockFilter === "in" ? !!p.inStock : !p.inStock);
    }

    if (priceSort === "asc") {
      list.sort((a, b) => (a.offerPrice ?? a.price ?? 0) - (b.offerPrice ?? b.price ?? 0));
    } else if (priceSort === "desc") {
      list.sort((a, b) => (b.offerPrice ?? b.price ?? 0) - (a.offerPrice ?? a.price ?? 0));
    }

    return list;
  }, [products, categoryFilter, stockFilter, priceSort]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    // reset to page 1 when filters change
    setCurrentPage(1);
  }, [categoryFilter, stockFilter, priceSort]);

  return (
    <div className="flex flex-col justify-between flex-1 py-10">
      <div className="w-full p-4 md:p-10">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <select
            className="px-3 py-2 text-sm border rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 text-sm border rounded-md"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <select
            className="px-3 py-2 text-sm border rounded-md"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="none">Price: None</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white border rounded-md border-gray-500/20">
          <table className="w-full overflow-hidden table-fixed md:table-auto">
            <thead className="text-sm text-left text-gray-900">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="hidden px-4 py-3 font-semibold truncate md:block">Selling Price</th>
   

                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {paginatedProducts.map((product) => (
                <tr key={product._id || product.name} className="border-t border-gray-500/20">
                  <td className="flex items-center py-3 pl-2 space-x-3 truncate md:px-4 md:pl-4">
                    <div className="overflow-hidden border border-gray-300 rounded">
                      {/* مطمئن شو product.image یک رشته یا URL است */}
                      <img src={product.image[0] || ""} alt="Product" className="w-16" />
                    </div>
                    <span className="w-full truncate max-sm:hidden">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">{currency} {product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center gap-3 text-gray-900 cursor-pointer">
                      <input onChange={(e)=> toggleStock(product._id , e.target.checked)}
                      checked={!!product.inStock} type="checkbox" className="sr-only peer" />
                      <div className="w-12 transition-colors duration-200 rounded-full h-7 bg-slate-300 peer peer-checked:bg-blue-600"></div>
                      <span className="absolute w-5 h-5 transition-transform duration-200 ease-in-out bg-white rounded-full dot left-1 top-1 peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-primary text-white"}`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded ${num === currentPage ? "bg-primary text-white font-semibold" : "bg-gray-200"}`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : "bg-primary text-white"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
