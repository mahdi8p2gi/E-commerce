import { categories } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Categories = () => {
  const { navigate } = useAppContext();

  // Animation variants for container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // Stagger appearance of items
      },
    },
  };

  // Animation variants for each category card
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.1 },
  };

  return (
    <div className="mt-16 bg-white">
      {/* Section title */}
      <p className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl">
        Categories
      </p>

      {/* Decorative underline */}
      <div className="w-20 h-1 mb-8 rounded-full bg-primary"></div>

      {/* Categories grid with animation */}
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate on first load
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.path || index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            style={{ backgroundColor: category.bgColor }}
            className="flex flex-col items-center justify-center px-4 py-6 shadow-sm cursor-pointer rounded-xl group"
            variants={itemVariants}
            whileHover="hover"
          >
            {/* Category image */}
            <motion.img
              src={category.image}
              alt={category.text}
              className="max-w-20"
              variants={{ hover: { scale: 1.15, rotate: 3 } }}
            />
            {/* Category name */}
            <p className="mt-3 text-md font-medium text-center text-gray-800">
              {category.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;
