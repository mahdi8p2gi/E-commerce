import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";


const ProductDetails = () => {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const { products, addToCart } = useAppContext();

  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLikedIcon, setIsLikedIcon] = useState(false)

  // Comments
  const [comments, setComments] = useState([
    {
      text: "Great product 👌",
      user: "Ali",
      likes: 2,
      dislikes: 0,
      replies: [{ text: "Totally agree", user: "Sara" }],
      userAction: null,
    },
    {
      text: "Didn't work for me.",
      user: "Reza",
      likes: 0,
      dislikes: 1,
      replies: [],
      userAction: null,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleWishListIcon = () => {
    setIsLikedIcon(!isLikedIcon)
  }


  useEffect(() => {
    const found = products.find((item) => item._id === id);
    if (found) {
      setProduct(found);
      setThumbnail(found.image[0]);
      const related = products.filter(
        (item) => item.category === found.category && item._id !== found._id
      );
      setRelatedProducts(related);
    }
  }, [id, products]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("Please enter your comment!");
      return;
    }

    setComments((prev) => [
      ...prev,
      {
        text: newComment,
        user: "Guest",
        likes: 0,
        dislikes: 0,
        replies: [],
        date: new Date().toISOString(),
      },
    ]);
    setNewComment("");
    toast.success("Comment submitted!");
  };



  const handleLike = (index) => {
    const updated = [...comments];
    const comment = updated[index];

    if (comment.userAction === "like") return;

    if (comment.userAction === "dislike") {
      comment.dislikes -= 1;
      comment.likes += 1;
      comment.userAction = "like";
    } else {
      comment.likes += 1;
      comment.userAction = "like";
    }

    setComments(updated);
  };

  const handleDislike = (index) => {
    const updated = [...comments];
    const comment = updated[index];

    if (comment.userAction === "dislike") return;

    if (comment.userAction === "like") {
      comment.likes -= 1;
      comment.dislikes += 1;
      comment.userAction = "dislike";
    } else {
      comment.dislikes += 1;
      comment.userAction = "dislike";
    }

    setComments(updated);
  };

  const handleReport = (index) => {
    toast.success("Thanks for your feedback!");
  };

  const handleReply = (index) => {
    if (!replyText.trim()) {toast.error("input is empty")} return 
    const updated = [...comments];
    updated[index].replies.push({ text: replyText, user: "Guest" });
    setComments(updated);
    setReplyingTo(null);
    setReplyText("");
  };

  if (!product) return <p className="p-6 text-lg">Product not found.</p>;



  return (
    <div className="w-full max-w-6xl px-6 mx-auto mt-20">
      <Toaster />
      <p className="text-sm text-gray-500">
        Home / Products / {product.category} /{" "}
        <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col gap-10 mt-6 md:flex-row">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setThumbnail(img)}
                className="object-cover w-20 h-20 border rounded cursor-pointer"
              />
            ))}
          </div>
          <img
            src={thumbnail}
            className="object-contain border rounded w-72 h-72"
          />
        </div>

        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <Tooltip.Provider delayDuration={100}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div onClick={handleWishListIcon}>
                      {isLikedIcon
                        ? <FaHeart onClick={handleWishListIcon} className="text-xl text-red-500 transition cursor-pointer hover:scale-110" />
                        : <FaRegHeart onClick={handleWishListIcon} className="text-xl text-red-500 transition cursor-pointer hover:scale-110" />
                      }
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="z-50 px-3 py-1 text-xs text-white rounded shadow-md bg-primary animate-fade-in"
                      side="bottom"
                      sideOffset={5}

                    >

                      {isLikedIcon ? "remove from wishlist" : "add to wishlist"}

                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>


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

      {/* Comments */}
      <div className="mt-20">
        <div className="flex items-center justify-between">
          <div className="">
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

        <form onSubmit={handleCommentSubmit} className="flex mt-4 space-x-2">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-primary"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 space-y-6">
          {[...comments]
            .sort((a, b) =>
              sortOrder === "newest"
                ? comments.indexOf(b) - comments.indexOf(a)
                : comments.indexOf(a) - comments.indexOf(b)
            )
            .map((comment, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-sm bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    {new Date(comment.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <button
                    onClick={() => handleReport(index)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Report
                  </button>
                </div>
                <p className="mt-1">{comment.text}</p>

                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <button onClick={() => handleLike(index)}>
                    👍 {comment.likes}
                  </button>
                  <button onClick={() => handleDislike(index)}>
                    👎 {comment.dislikes}
                  </button>
                  <button onClick={() => setReplyingTo(index)}>🗨 Reply</button>
                </div>

                {comment.replies.length > 0 && (
                  <div className="pl-4 mt-3 space-y-1 border-l">
                    {comment.replies.map((reply, i) => (
                      <div key={i} className="text-sm text-gray-700">
                        <strong>{reply.user}:</strong> {reply.text}
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === index && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full px-3 py-1 mt-1 text-sm border rounded"
                    />
                    <button
                      onClick={() => handleReply(index)}
                      className="px-3 py-1 mt-1 text-sm text-white rounded bg-primary"
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Related Products */}
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
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
