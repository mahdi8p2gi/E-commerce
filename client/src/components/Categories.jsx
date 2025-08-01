import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Categories() {
  const { navigate } = useAppContext();

  return (
    <div className="px-4 mt-16 bg-white md:px-8 lg:px-16">
      <p className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl">
        Categories
      </p>
      <div className="w-20 h-1 mb-8 rounded-full bg-primary"></div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            style={{ backgroundColor: category.bgColor }}
            className="flex flex-col items-center justify-center px-4 py-6 transition-transform shadow-sm cursor-pointer rounded-xl group hover:scale-105 hover:shadow-lg"
          >
            <img
              src={category.image}
              alt={category.text}
              className="transition-transform group-hover:scale-110 max-w-20"
            />
            <p className="mt-3 text-sm font-medium text-center text-gray-800">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
