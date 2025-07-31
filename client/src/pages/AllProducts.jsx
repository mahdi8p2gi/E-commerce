import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import ScrollToTopButton from "../components/ScrollToTopButton";

function AllProducts() {
  const { products, searchQuery } = useAppContext();
  const { category } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);

  // وضعیت صفحه فعلی (شروع از صفحه 1)
  const [currentPage, setCurrentPage] = useState(1);

  // تعداد محصولات در هر صفحه
  const itemsPerPage = 10;

  useEffect(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // وقتی فیلتر تغییر می‌کنه صفحه رو برمی‌گردونیم 1
  }, [products, searchQuery, category]);

  // محاسبه کل صفحات
  const totalPages = Math.ceil(
    filteredProducts.filter((p) => p.inStock).length / itemsPerPage
  );

  // محصولات برای صفحه فعلی را برش می‌زنیم
  const currentProducts = filteredProducts
    .filter((p) => p.inStock)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // تابع تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // وقتی صفحه تغییر کرد به بالا اسکرول کن
  };

  return (
    <div className="flex flex-col px-4 mt-16 md:px-8 lg:px-16">
      <div className="flex flex-col items-start">
        <p className="text-2xl font-semibold">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {currentProducts.length === 0 ? (
        <p className="w-full mt-12 text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}

      {/* بخش صفحه بندی */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-16">
          {/* دکمه صفحه قبلی */}
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            Prev
          </button>

          {/* شماره صفحات */}
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  pageNum === currentPage
                    ? "bg-primary text-white font-bold"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* دکمه صفحه بعدی */}
          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            Next
          </button>
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}

export default AllProducts;
