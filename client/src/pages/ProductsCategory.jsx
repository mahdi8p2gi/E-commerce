import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { categories } from "../assets/assets";

function ProductsCategory() {
  // -------------------- Context --------------------
  const { products = [] } = useAppContext(); // Default to empty array to avoid undefined
  const { category } = useParams(); // URL parameter for the category

  // -------------------- Find Category Metadata --------------------
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  // -------------------- Filter Products by Category --------------------
  const filteredProducts = useMemo(
    () =>
      products?.filter(
        (product) => (product.category || "").toLowerCase() === category
      ) || [],
    [products, category]
  );

  // -------------------- Pagination --------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(Math.ceil(filteredProducts.length / itemsPerPage), 1);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Get products for the current page
  const currentProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredProducts, currentPage]
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  return (
    <div className="px-4 py-20 md:px-16 lg:px-24 xl:px-32">
      {/* Category Title */}
      {searchCategory && (
        <div className="mb-8">
          <p className="text-2xl font-semibold capitalize">{searchCategory.text}</p>
          <div className="w-16 h-1 mt-2 rounded-full bg-primary"></div>
        </div>
      )}

      {/* Products Grid or No Products Message */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-center text-gray-500">
          No products found in this category.
        </div>
      )}

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-primary text-white"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 rounded ${
                num === currentPage
                  ? "bg-primary text-white font-semibold"
                  : "bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-primary text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsCategory;
