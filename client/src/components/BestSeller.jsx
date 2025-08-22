import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

function BestSeller() {
  const { products } = useAppContext();

  if (!products || products.length === 0) {
    return null;
  }

  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 5);

  return (
    <div className="px-4 mt-16 bg-white md:px-0">
      <p className="mb-6 text-2xl font-semibold  text-gray-800 md:text-3xl">
        Best Sellers
      </p>
      <div className="w-20 h-1  mt-2 mb-8 rounded-full bg-primary"></div>

      {/* گرید محصولات */}
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bestSellers.map((product) => (
          <div key={product._id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
