import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from "axios";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addToCart } = useAppContext();
  const API_URL = process.env.REACT_APP_API_URL;
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLikedIcon, setIsLikedIcon] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [sortOrder, setSortOrder] = useState("oldest");

  // Load product & related products
  useEffect(() => {
    if (!products?.length || !id) return;
    const found = products.find((p) => p._id === id);
    if (!found) return;

    setProduct(found);
    setThumbnail(found.image?.[0] || "");
    setRelatedProducts(products.filter((p) => p.category === found.category && p._id !== found._id));
  }, [id, products]);

  // Load comments from backend
  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/comments/${id}`)
          ;

        if (res.data.message) {

          setComments([]);
          toast.info(res.data.message);
        } else {
          setComments(res.data.comments || []);
        }
      } catch {

      }
    };

    fetchComments();
  }, [id]);
  const randomRating = Math.floor(Math.random() * 5) + 1;
  const toggleWishlist = () => setIsLikedIcon((prev) => !prev);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Please enter your comment!");

    try {
      const res = await axios.post(`${API_URL}/api/comments`, {
        productId: id,
        user: "Guest",
        text: newComment.trim(),
      });
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
      toast.success("Comment submitted!");
    } catch {
      toast.error("Failed to submit comment");
    }
  };

  const handleReply = async (commentId) => {
    if (!replyText.trim()) return toast.error("Reply cannot be empty!");
    try {
      const res = await axios.post(`${API_URL}/api/comments/${commentId}/reply`, {
        user: "Guest",
        text: replyText.trim(),
      });


      setComments((prev) => prev.map((c) => (c._id === commentId ? res.data : c)));
      setReplyText("");
      setReplyingTo(null);
      toast.success("Reply added!");
    } catch {
      toast.error("Failed to submit reply");
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await axios.post(`${API_URL}/api/comments/${commentId}/like`);

      setComments((prev) => prev.map((c) => (c._id === commentId ? res.data : c)));
    } catch {
      toast.error("Failed to like comment");
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const res = await axios.post(`${API_URL}/api/comments/${commentId}/dislike`);

      setComments((prev) => prev.map((c) => (c._id === commentId ? res.data : c)));
    } catch {
      toast.error("Failed to dislike comment");
    }
  };

  if (!product) return <p className="p-6 text-lg text-center">Product not found.</p>;

  return (
    <div className="w-full max-w-6xl px-4 mx-auto mt-20">
      <Toaster />
      <p className="text-sm text-gray-500">
        Home / Products / {product?.category} / <span className="text-primary">{product?.name}</span>
      </p>

      {/* Product Section */}
      <div className="flex flex-col gap-10 mt-6 md:flex-row">
        <div className="flex gap-4 flex-shrink-0">
          <div className="flex flex-col gap-3">
            {product?.image?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="product-img"
                onClick={() => setThumbnail(img)}
                className={`object-cover w-20 h-20 border rounded cursor-pointer transition-all duration-300 ${thumbnail === img ? "ring-2 ring-primary" : ""
                  }`}
              />
            ))}
          </div>
          <img
            src={thumbnail}
            alt={product?.name}
            className="object-contain border rounded w-72 h-72 md:w-80 md:h-80"
          />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">{product?.name}</h1>
              <Tooltip.Provider delayDuration={100}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      {isLikedIcon ? (
                        <FaHeart onClick={toggleWishlist} className="text-xl text-red-500 cursor-pointer transition hover:scale-110" />
                      ) : (
                        <FaRegHeart onClick={toggleWishlist} className="text-xl text-red-500 cursor-pointer transition hover:scale-110" />
                      )}
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="z-50 px-3 py-1 text-xs text-white rounded shadow-md bg-primary" side="bottom" sideOffset={5}>
                      {isLikedIcon ? "Remove from wishlist" : "Add to wishlist"}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>

            <p className="mt-1 text-sm text-gray-500 capitalize">{product?.category}</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg sm:text-xl transition-colors duration-300 ${i < randomRating ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-500 cursor-pointer`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm sm:text-base text-gray-500">
                ({randomRating})
              </span>
            </div>

            <div className="mt-4">
              {product?.offerPrice && product.offerPrice < product.price ? (
                <>
                  <p className="text-gray-400 line-through">${product.price}</p>
                  <p className="text-2xl font-semibold text-primary">${product.offerPrice}</p>
                </>
              ) : (
                <p className="text-2xl font-semibold text-primary">${product.price}</p>
              )}
              <p className="mt-1 text-sm text-gray-400">(inclusive of all taxes)</p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-base font-semibold">About Product:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {product?.description?.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { addToCart(product._id); navigate("/cart"); }}
              className="flex-1 py-3 font-medium text-white bg-primary hover:bg-primary-dull transition-all rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">User Comments</h2>
            <div className="w-20 h-0.5 rounded-full bg-primary mt-2"></div>
          </div>

          <select
            className="p-1 text-sm border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* فرم ثبت کامنت */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 w-full"
        >
          <input
            type="text"
            className="flex-1 px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 transition-all"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 sm:py-3 text-sm sm:text-base text-white rounded-md bg-primary hover:bg-primary-dull transition-all shadow-md hover:shadow-lg"
          >
            Submit
          </button>
        </form>


        {/* commnets*/}
        <div className="mt-6 space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 mt-4 text-center">
              There is no comment for this product yet            </p>
          ) : (
            [...comments]
              .sort((a, b) =>
                sortOrder === "newest"
                  ? new Date(b.date) - new Date(a.date)
                  : new Date(a.date) - new Date(b.date)
              )
              .map((comment) => (
                <div
                  key={comment._id}
                  className="p-4 border rounded shadow-sm bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {new Date(comment.date).toLocaleString()}
                    </p>
                    <button
                      onClick={() => toast.success("Thanks for your feedback!")}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Report
                    </button>
                  </div>

                  <p className="mt-1">{comment.text}</p>

                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <button onClick={() => handleLike(comment._id)}>
                      👍 {comment.likes || 0}
                    </button>
                    <button onClick={() => handleDislike(comment._id)}>
                      👎 {comment.dislikes || 0}
                    </button>
                    <button onClick={() => setReplyingTo(comment._id)}>🗨 Reply</button>
                  </div>

                  {comment.replies?.length > 0 && (
                    <div className="pl-4 mt-3 space-y-1 border-l">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply._id || reply.text}
                          className="text-sm text-gray-700"
                        >
                          <strong>{reply.user}:</strong> {reply.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {replyingTo === comment._id && (
                    <div className="mt-2 flex flex-col gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full px-3 py-1 text-sm border rounded focus:outline-primary"
                      />
                      <button
                        onClick={() => handleReply(comment._id)}
                        className="px-3 py-1 text-sm text-white rounded bg-primary hover:bg-primary-dull transition-all w-max"
                      >
                        Send Reply
                      </button>
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 rounded-full bg-primary mt-2"></div>
        </div>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {relatedProducts.filter((p) => p.inStock).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        <button
          className="px-12 py-2.5 mt-12 border rounded text-primary hover:bg-primary/10 transition-all"
          onClick={() => { navigate("/products"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
