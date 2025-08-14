import { useAppContext } from "../context/AppContext";
import { HiOutlineTrash } from "react-icons/hi2";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useAppContext();

  if (wishlist.length === 0) return <p>Your wishlist is empty</p>;

  return (
    <div>
      <h1 className="py-6 text-2xl font-medium">Wishlist</h1>
      <div className="w-20 h-1 mb-8 rounded-full bg-primary"></div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            {/* کارت */}
            <div className="border border-gray-500 h-[300px] w-full p-4 flex flex-col items-center justify-center">
              <img src={item.image} alt={item.name} className="h-32 object-contain mb-2" />
              <span className="font-medium">{item.name}</span>
              <div 
                onClick={() => removeFromWishlist(item._id)} 
                className="cursor-pointer mt-2"
              >
                <HiOutlineTrash size={20} />
              </div>
            </div>

            {/* دکمه‌ها خارج از کارت */}
            <div className="w-full mt-2 flex flex-col gap-2">
              <button className="w-full py-3 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded">
                Add to Cart
              </button>
              <button className="w-full py-3 font-medium text-white bg-primary hover:bg-primary-dull rounded">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
