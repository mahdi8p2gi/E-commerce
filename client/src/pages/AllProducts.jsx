import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Pagination from "../components/Pagination"; // کامپوننت Pagination

const AllProducts = ()=> {
  const { products, searchQuery } = useAppContext();
  const { category } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1);
  }, [products, searchQuery, category]);

  const inStockProducts = filteredProducts.filter((p) => p.inStock);
  const totalPages = Math.ceil(inStockProducts.length / itemsPerPage);

  const currentProducts = inStockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div className="grid justify-center grid-cols-1  gap-6 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* کامپوننت Pagination */}
      {totalPages > 1 && (
        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            primary="primary" // رنگ اصلی پروژه
          />
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}

export default AllProducts;
