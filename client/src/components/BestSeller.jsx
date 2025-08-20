import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

function BestSeller() {
  const { products } = useAppContext();

  if (!products || products.length === 0) {
    return null;
  }

  const bestSellers = products
    .filter(product => product.inStock)
    .slice(0, 5);

  return (
    <div className="px-4 mt-16 bg-white md:px-0">
      <p className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl">
        Best Sellers
      </p>
      <div className="w-20 h-1 mt-2 mb-8 rounded-full bg-primary"></div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
