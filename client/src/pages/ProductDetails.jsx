import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { category, id } = useParams();
  const { products, addToCart } = useAppContext();

  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const found = products.find((item) => item._id === id);
    if (found) {
      setProduct(found);
      setThumbnail(found.image[0]);
    }
  }, [id, products]);

  if (!product) return <p className="p-6 text-lg">Product not found.</p>;

  return (
    <div className="w-full max-w-6xl px-6 mx-auto mt-20">
      <p className="text-sm text-gray-500">
        Home / Products / {product.category} / <span className="text-indigo-500">{product.name}</span>
      </p>

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
                <span key={i}>
                  {i < product.rating ? "⭐" : "☆"}
                </span>
              ))}
              <span className="ml-2 text-gray-500">({product.rating})</span>
            </div>

            <div className="mt-4">
              <p className="text-gray-500 line-through">${product.price}</p>
              <p className="text-2xl font-semibold text-primary">${product.offerPrice}</p>
              <p className="mt-1 text-sm text-gray-400">(inclusive of all taxes)</p>
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
            <button className="w-full py-3 font-medium text-white bg-primary hover:bg-primary-dull">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
