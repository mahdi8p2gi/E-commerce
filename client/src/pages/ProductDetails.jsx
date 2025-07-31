import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { category, id } = useParams();
  const { products, addToCart } = useAppContext();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const found = products.find((item) => item._id === id);
    if (found) {
      setProduct(found);
      setThumbnail(found.image[0]);

      // پیدا کردن محصولات مرتبط (هم‌دسته ولی با آیدی متفاوت)
      const related = products.filter(
        (item) => item.category === found.category && item._id !== found._id
      );
      setRelatedProducts(related);
    }
  }, [id, products]);

  if (!product) return <p className="p-6 text-lg">Product not found.</p>;

  return (
    <div className="w-full max-w-6xl px-6 mx-auto mt-20">
      {/* مسیر */}
      <p className="text-sm text-gray-500">
        Home / Products / {product.category} /{" "}
        <span className="text-indigo-500">{product.name}</span>
      </p>

      {/* بخش اصلی */}
      <div className="flex flex-col gap-10 mt-6 md:flex-row">
        {/* تصاویر محصول */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setThumbnail(img)}
                className="object-cover w-20 h-20 border rounded cursor-pointer"
                alt={`Thumbnail ${i}`}
              />
            ))}
          </div>
          <img
            src={thumbnail}
            className="object-contain border rounded w-72 h-72"
            alt="Main Product"
          />
        </div>

        {/* اطلاعات محصول */}
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>

            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < product.rating ? "⭐" : "☆"}</span>
              ))}
              <span className="ml-2 text-gray-500">({product.rating})</span>
            </div>

            <div className="mt-4">
              <p className="text-gray-500 line-through">${product.price}</p>
              <p className="text-2xl font-semibold text-primary">
                ${product.offerPrice}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                (inclusive of all taxes)
              </p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-base font-semibold">About Product:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {product.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3 font-medium text-white bg-primary hover:bg-primary-dull"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* محصولات مرتبط */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 rounded-full bg-primary mt-2"></div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 mt-6 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
        </div>

        <button
          className="px-12 mx-auto my-16 cursor-pointer py-2.5 border rounded text-primary hover:bg-primary/10 transition"
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
