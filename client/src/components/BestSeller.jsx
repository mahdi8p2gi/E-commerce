import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

function BestSeller() {
  const { products } = useAppContext();

  // Return nothing if no products available
  if (!products || products.length === 0) return null;

  // Filter in-stock products and take top 5
  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 5);

  // Animation variants for the container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // Stagger children animations
      },
    },
  };

  // Animation variants for each product card
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.15)" }, // Hover effect
  };

  return (
    <div className="px-4 mt-16 bg-white md:px-0">
      {/* Section title */}
      <p className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl">
        Best Sellers
      </p>

      {/* Decorative underline */}
      <div className="w-20 h-1 mt-2 mb-8 rounded-full bg-primary"></div>

      {/* Product cards grid with animation */}
      <motion.div
        className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bestSellers.map((product, idx) => (
          <motion.div
            key={product?._id || `${product?.name || "item"}-${idx}`}
            className="flex justify-center rounded-xl overflow-hidden"
            variants={itemVariants}
            whileHover="hover"
            style={{
              background: "linear-gradient(145deg, #f0f8ff, #e0f7fa)", // Cool gradient background
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default BestSeller;
