import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const { products, searchQuery } = useAppContext();
  const { category } = useParams(); // ✅ گرفتن دسته از آدرس URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let filtered = products;

    // ✅ فیلتر با توجه به دسته
    if (category) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // ✅ فیلتر با توجه به جستجو
    if (searchQuery.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, category]);

  return (
    <div className="flex flex-col px-4 mt-16 md:px-8 lg:px-16">
      <div className="flex flex-col items-start">
        <p className="text-2xl font-semibold">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="w-full mt-12 text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
