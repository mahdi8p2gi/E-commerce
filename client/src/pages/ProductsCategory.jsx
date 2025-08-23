import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { categories } from "../assets/assets";

function ProductsCategory() {
  const { products = [] } = useAppContext(); // ← مقدار پیشفرض آرایه
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products?.filter(
    (product) => product.category.toLowerCase() === category
  ) || [];

  return (
    <div className="px-4 py-20 md:px-16 lg:px-24 xl:px-32">
      {/* عنوان دسته‌بندی */}
      {searchCategory && (
        <div className="mb-8">
          <p className="text-2xl font-semibold capitalize">
            {searchCategory.text}
          </p>
          <div className="w-16 h-1 mt-2 rounded-full bg-primary"></div>
        </div>
      )}

      {/* محصولات یا پیام عدم وجود */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-center text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
}

export default ProductsCategory;
